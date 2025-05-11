import cors from "cors";
import express, { Application } from "express";
import userRoutes from "../routes/usuarios";
import fallecidosRoutes from "../routes/fallecidos";
import uploadsRoutes from "../routes/uploads";
import sepulturaRoutes from "../routes/sepulturas";
import likesRoutes from "../routes/likes";
import futurosRoutes from "../routes/futuros";
import favoritosRoutes from "../routes/favoritos";
import perfilesRoutes from "../routes/perfiles";
import historiasRoutes from "../routes/historias";
import comentariosRoutes from "../routes/comentarios";
import db from "../db/connection";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

class Server {
  private app: Application;
  private port: string;
  private secret: string;

  constructor() {
    this.app = express();
    this.secret = process.env.SECRET_JWT_SEED || "";
    this.port = process.env.PORT || "4000";

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  private async dbConnection() {
    try {
      console.log("➡️  Conectando a DB:", {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        db: process.env.DB_NAME,
      });
      await db.authenticate();
      console.log("✅ Autenticado correctamente con la base de datos");
      await db.sync({ alter: true });
      console.log("✅ Base de datos ONLINE");
    } catch (error) {
      console.error("❌ Error real de conexión:", (error as any).original || error);
      throw new Error("No se pudo conectar a la base de datos");
    }
  }

  private middlewares(): void {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:4000",
      "https://cementereact.vercel.app",
    ];
    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin) return callback(null, true);
          if (allowedOrigins.includes(origin)) return callback(null, true);
          callback(new Error("Origen no permitido por CORS"));
        },
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type,Authorization,x-token",
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
    this.app.use(express.static("public"));
  }

  private routes() {
    this.app.use("/api/usuarios", userRoutes);
    this.app.use("/api/muertos", fallecidosRoutes);
    this.app.use("/api/uploads", uploadsRoutes);
    this.app.use("/api/sepulturas", sepulturaRoutes);
    this.app.use("/api/likes", likesRoutes);
    this.app.use("/api/comentarios", comentariosRoutes);
    this.app.use("/api/futuros", futurosRoutes);
    this.app.use("/api/favoritos", favoritosRoutes);
    this.app.use("/api/perfiles", perfilesRoutes);
    this.app.use("/api/historias", historiasRoutes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en puerto ${this.port}`);
    });
  }
}

export default Server;
