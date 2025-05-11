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
exports.borrarLikes = exports.obtenerLikes = exports.obtenerLikeIndividual = exports.crearLikes = void 0;
const likes_1 = __importDefault(require("../models/likes"));
const crearLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const likes = likes_1.default.build(body);
        yield likes.save();
        res.json(likes);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.crearLikes = crearLikes;
const obtenerLikeIndividual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fallecidoId } = req.params;
    console.log(fallecidoId);
    const likes = yield likes_1.default.findAll({ where: { fallecidoId: fallecidoId } });
    try {
        if (!fallecidoId) {
            res.json(likes);
        }
        return res.json(likes);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.obtenerLikeIndividual = obtenerLikeIndividual;
const obtenerLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fallecidoId } = req.body;
    console.log(fallecidoId);
    const likes = yield likes_1.default.findAll(
    /* {
        where: {fallecidoId : fallecidoId},
    } */
    );
    res.json(likes);
});
exports.obtenerLikes = obtenerLikes;
const borrarLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fallecidoId = req.params.fallecidoId;
    const usuarioId = req.params.usuarioId;
    console.log(usuarioId);
    const likes = yield likes_1.default.findOne({
        where: { usuarioId: usuarioId, fallecidoId: fallecidoId },
    });
    yield (likes === null || likes === void 0 ? void 0 : likes.destroy());
    res.json(likes);
});
exports.borrarLikes = borrarLikes;
//# sourceMappingURL=likes.js.map