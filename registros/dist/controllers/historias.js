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
exports.deleteFallecido = exports.putFallecido = exports.actualizarFallecidoCloudinary = exports.postFallecidos = exports.crearHistoriaCloudinary = exports.getFallecido = exports.getFallecidos = exports.getHistoriaPorFallecido = exports.obtenerRelacionado = void 0;
const validarExtensionCorte_1 = require("../helpers/validarExtensionCorte");
const fallecido_1 = __importDefault(require("../models/fallecido"));
const cloudinary_1 = require("cloudinary");
const actualizar_imagen_cloudinary_1 = __importDefault(require("../helpers/actualizar-imagen-cloudinary"));
const historia_1 = __importDefault(require("../models/historia"));
const obtenerRelacionado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sepult } = req.params;
    console.log(sepult);
    const muerto = yield fallecido_1.default.findAll({ where: { sepult: sepult } });
    try {
        if (!sepult) {
            res.json(muerto);
        }
        return res.json(muerto);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.obtenerRelacionado = obtenerRelacionado;
const getHistoriaPorFallecido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fallecidoId = req.params.fallecidoId;
    console.log('Este es el valor del fallecidoId: ' + fallecidoId);
    try {
        const historias = yield historia_1.default.findAll({ limit: 10,
            where: { fallecidoId: fallecidoId }
        });
        res.json(historias);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.getHistoriaPorFallecido = getHistoriaPorFallecido;
const getFallecidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fallecidos = yield fallecido_1.default.findAll();
    res.json(fallecidos);
});
exports.getFallecidos = getFallecidos;
const getFallecido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fallecidos = yield fallecido_1.default.findByPk(id);
    res.json(fallecidos);
});
exports.getFallecido = getFallecido;
const crearHistoriaCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const body = req.body;
    //const tipo = 'fallecidos'    
    // Procesar la carga de la imagen
    const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
    const validando = (0, validarExtensionCorte_1.validarExtensionCorte)(file);
    if (!validando) {
        console.log('llego hasta aqui');
        res.status(404).json({
            ok: false,
            msg: 'La extension no es válida'
        });
    }
    else {
        try {
            //Cloudinary comprobar path y nombre
            const tempFilePath = (_b = req.files) === null || _b === void 0 ? void 0 : _b.file;
            console.log(tempFilePath.tempFilePath);
            const { secure_url } = yield cloudinary_1.v2.uploader.upload(tempFilePath.tempFilePath);
            body.img = secure_url;
            const historia = historia_1.default.build(body);
            yield historia.save();
            console.log('Historia creada en base de datos y archivo en Cloudinary');
            res.json(historia);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: `Hable con el Administrador`
            });
        }
    }
});
exports.crearHistoriaCloudinary = crearHistoriaCloudinary;
const postFallecidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    console.log(body);
    try {
        const fallecidos = fallecido_1.default.build(body);
        yield fallecidos.save();
        console.log('Fallecido creado en base de datos');
        res.json(fallecidos);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.postFallecidos = postFallecidos;
const actualizarFallecidoCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const body = req.body;
    const tipo = req.params.tipo;
    const id = req.params.id;
    // Procesar la carga de la imagen
    const file = (_c = req.files) === null || _c === void 0 ? void 0 : _c.file;
    console.log(file);
    const validando = (0, validarExtensionCorte_1.validarExtensionCorte)(file);
    if (!validando) {
        console.log('llego hasta aqui');
        res.status(404).json({
            ok: true,
            msg: 'La extension no es válida'
        });
    }
    else {
        //Cloudinary comprobar path y nombre
        const tempFilePath = (_d = req.files) === null || _d === void 0 ? void 0 : _d.file;
        const { secure_url } = yield cloudinary_1.v2.uploader.upload(tempFilePath.tempFilePath);
        const nombreArchivo = secure_url;
        (0, actualizar_imagen_cloudinary_1.default)(id, tipo, nombreArchivo, body);
        res.json('por fi');
    }
});
exports.actualizarFallecidoCloudinary = actualizarFallecidoCloudinary;
const putFallecido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const fallecido = yield fallecido_1.default.findByPk(id);
        if (!fallecido) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun fallecido con el id ' + id
            });
        }
        yield fallecido.update(body);
        res.json(fallecido);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.putFallecido = putFallecido;
const deleteFallecido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const fallecido = yield fallecido_1.default.findByPk(id);
        if (!fallecido) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con el ID: ' + id
            });
        }
        yield fallecido.destroy();
        res.json(fallecido);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.deleteFallecido = deleteFallecido;
//# sourceMappingURL=historias.js.map