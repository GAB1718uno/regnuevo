"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Extrae el token del encabezado
    if (!token) {
        return res.status(401).json({ msg: "No autenticado al validar JWT" });
    }
    console.log("Comprobando...");
    try {
        // Decodifica el token y verifica su validez
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_SEED); // Asegúrate de que decoded.sub sea de tipo string
        console.log("Verifico token... e imprimo: " + JSON.stringify(decoded, null, 2));
        // Asigna el userId al objeto req.user
        req.user = { id: decoded.sub }; // Asegúrate de que decoded.sub sea un string
        console.log("A ver el userID ahora: " + req.user.id);
        next(); // Continúa con la siguiente función de middleware o ruta
    }
    catch (error) {
        console.error("Token inválido:", error);
        return res.status(401).json({ msg: "Token inválido" });
    }
};
exports.validarJWT = validarJWT;
//# sourceMappingURL=validarJWT.js.map