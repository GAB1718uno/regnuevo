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
exports.obtenerFavoritos = exports.crearFavoritos = void 0;
const favoritos_1 = __importDefault(require("../models/favoritos"));
const fallecido_1 = __importDefault(require("../models/fallecido")); // Importa el modelo de fallecidos
// Importa también el modelo o función que actualice el estado del fallecido en la tabla "fallecidos"
const crearFavoritos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Obtén el userId del token JWT
    const { fallecidoId } = req.params;
    if (!userId) {
        return res.status(401).json({ ok: false, msg: "Usuario no autenticado" });
    }
    try {
        // Busca el fallecido en la base de datos
        const fallecido = yield fallecido_1.default.findByPk(fallecidoId);
        if (!fallecido) {
            return res.status(404).json({ ok: false, msg: "Fallecido no encontrado" });
        }
        // Verifica si el favorito ya existe
        const favoritoExistente = yield favoritos_1.default.findOne({ where: { userId, fallecidoId } });
        if (favoritoExistente) {
            // Si el favorito existe, elimínalo
            yield favoritoExistente.destroy();
            // Actualiza el campo `favorito` en la tabla `fallecidos` a 0 (no favorito)
            yield fallecido.update({ favorito: 0 });
            return res.json({ ok: true, msg: "Eliminado de favoritos", favorito: false });
        }
        else {
            // Si el favorito no existe, créalo
            yield favoritos_1.default.create({ userId, fallecidoId });
            // Actualiza el campo `favorito` en la tabla `fallecidos` a 1 (favorito)
            yield fallecido.update({ favorito: 1 });
            return res.json({ ok: true, msg: "Agregado a favoritos", favorito: true });
        }
    }
    catch (error) {
        console.error("Error en toggleFavorito:", error);
        res.status(500).json({ ok: false, msg: "Error en el servidor" });
    }
});
exports.crearFavoritos = crearFavoritos;
const obtenerFavoritos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id; // Asegúrate de que validarJwt asigna req.uid
    console.log("Este es el userId: " + userId);
    if (!userId) {
        return res.status(401).json({ msg: "No autenticado" });
    }
    try {
        const favoritos = yield favoritos_1.default.findAll({
            where: { userId },
            include: [{
                    model: fallecido_1.default,
                    as: "fallecido",
                }],
        });
        // Ahora TypeScript sabe que cada favorito puede tener la propiedad "fallecido"
        const fallecidosFavoritos = favoritos.map((fav) => fav.fallecido);
        res.json(fallecidosFavoritos);
    }
    catch (error) {
        console.error("Error al obtener favoritos:", error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
exports.obtenerFavoritos = obtenerFavoritos;
//# sourceMappingURL=favoritos.js.map