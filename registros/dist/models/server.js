"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const fallecidos_1 = __importDefault(require("../routes/fallecidos"));
const uploads_1 = __importDefault(require("../routes/uploads"));
const sepulturas_1 = __importDefault(require("../routes/sepulturas"));
const likes_1 = __importDefault(require("../routes/likes"));
const futuros_1 = __importDefault(require("../routes/futuros"));
const favoritos_1 = __importDefault(require("../routes/favoritos"));
const perfiles_1 = __importDefault(require("../routes/perfiles"));
const historias_1 = __importDefault(require("../routes/historias"));
const comentarios_1 = __importDefault(require("../routes/comentarios"));
const connection_1 = __importDefault(require("../db/connection"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const body_parser_1 = __importDefault(require("body-parser"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.secret = process.env.SECRET_JWT_SEED || "";
        this.port = process.env.PORT || "4000";
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("➡️  Conectando a DB:", {
                    host: process.env.DB_HOST,
                    port: process.env.DB_PORT,
                    user: process.env.DB_USER,
                    db: process.env.DB_NAME,
                });
                yield connection_1.default.authenticate();
                console.log("✅ Autenticado correctamente con la base de datos");
                yield connection_1.default.sync({ alter: true });
                console.log("✅ Base de datos ONLINE");
            }
            catch (error) {
                console.error("❌ Error real de conexión:", error.original || error);
                throw new Error("No se pudo conectar a la base de datos");
            }
        });
    }
    middlewares() {
        const allowedOrigins = [
            "http://localhost:3000",
            "http://localhost:4000",
            "https://cementereact.vercel.app",
        ];
        this.app.use((0, cors_1.default)({
            origin: (origin, callback) => {
                if (!origin)
                    return callback(null, true);
                if (allowedOrigins.includes(origin))
                    return callback(null, true);
                callback(new Error("Origen no permitido por CORS"));
            },
            methods: "GET,POST,PUT,DELETE",
            allowedHeaders: "Content-Type,Authorization,x-token",
            credentials: true,
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json({ limit: "50mb" }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true, limit: "50mb" }));
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: "/tmp/",
        }));
        this.app.use(express_1.default.static("public"));
    }
    routes() {
        this.app.use("/api/usuarios", usuarios_1.default);
        this.app.use("/api/muertos", fallecidos_1.default);
        this.app.use("/api/uploads", uploads_1.default);
        this.app.use("/api/sepulturas", sepulturas_1.default);
        this.app.use("/api/likes", likes_1.default);
        this.app.use("/api/comentarios", comentarios_1.default);
        this.app.use("/api/futuros", futuros_1.default);
        this.app.use("/api/favoritos", favoritos_1.default);
        this.app.use("/api/perfiles", perfiles_1.default);
        this.app.use("/api/historias", historias_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Servidor corriendo en puerto ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map