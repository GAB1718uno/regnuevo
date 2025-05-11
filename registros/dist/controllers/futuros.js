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
exports.deleteFallecido = exports.actualizarFuturos = exports.borrarFuturos = exports.actualizarFallecidoCloudinary = exports.crearFuturos = exports.crearFallecidoCloudinary = exports.getFallecido = exports.obtenerFuturos = exports.getFallecidosCriba = exports.obtenerRelacionado = void 0;
const sequelize_1 = require("sequelize");
const validarExtensionCorte_1 = require("../helpers/validarExtensionCorte");
const fallecido_1 = __importDefault(require("../models/fallecido"));
const cloudinary_1 = require("cloudinary");
const actualizar_imagen_cloudinary_1 = __importDefault(require("../helpers/actualizar-imagen-cloudinary"));
const futuros_1 = __importDefault(require("../models/futuros"));
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
            msg: `Hable con el Administrador`,
        });
    }
});
exports.obtenerRelacionado = obtenerRelacionado;
const getFallecidosCriba = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tipo = req.params.tipo;
    const busqueda = req.params.termino;
    switch (tipo) {
        case "apellido":
            const fallecidos = yield fallecido_1.default.findAll({
                limit: 10,
                where: {
                    apellidos: {
                        [sequelize_1.Op.like]: "%" + busqueda + "%",
                    },
                },
            });
            res.json(fallecidos);
            break;
        case "sepultura":
            const fallecidosSep = yield fallecido_1.default.findAll({
                limit: 10,
                where: {
                    sepult: {
                        [sequelize_1.Op.like]: "%" + busqueda + "%",
                    },
                },
            });
            res.json(fallecidosSep);
            break;
        default:
            res.status(400).json({
                msg: `Hable con el Administrador`,
            });
    }
});
exports.getFallecidosCriba = getFallecidosCriba;
const obtenerFuturos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const futuros = yield futuros_1.default.findAll();
    res.json(futuros);
    console.log(futuros);
});
exports.obtenerFuturos = obtenerFuturos;
const getFallecido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fallecidos = yield fallecido_1.default.findByPk(id);
    res.json(fallecidos);
});
exports.getFallecido = getFallecido;
const crearFallecidoCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const body = req.body;
    const tipo = "fallecidos";
    // Procesar la carga de la imagen
    const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
    const validando = (0, validarExtensionCorte_1.validarExtensionCorte)(file);
    if (!validando) {
        console.log("llego hasta aqui");
        res.status(404).json({
            ok: false,
            msg: "La extension no es válida",
        });
    }
    else {
        try {
            //Cloudinary comprobar path y nombre
            const tempFilePath = (_b = req.files) === null || _b === void 0 ? void 0 : _b.file;
            console.log(tempFilePath.tempFilePath);
            const { secure_url } = yield cloudinary_1.v2.uploader.upload(tempFilePath.tempFilePath);
            body.url = secure_url;
            const fallecido = fallecido_1.default.build(body);
            yield fallecido.save();
            console.log("Fallecido creado en base de datos y archivo en Cloudinary");
            res.json(fallecido);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: `Hable con el Administrador`,
            });
        }
    }
});
exports.crearFallecidoCloudinary = crearFallecidoCloudinary;
const crearFuturos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    console.log(body);
    try {
        const futuros = futuros_1.default.build(body);
        yield futuros.save();
        console.log("Fallecido creado en base de datos");
        res.json(futuros);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`,
        });
    }
});
exports.crearFuturos = crearFuturos;
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
        console.log("llego hasta aqui");
        res.status(404).json({
            ok: true,
            msg: "La extension no es válida",
        });
    }
    else {
        //Cloudinary comprobar path y nombre
        const tempFilePath = (_d = req.files) === null || _d === void 0 ? void 0 : _d.file;
        const { secure_url } = yield cloudinary_1.v2.uploader.upload(tempFilePath.tempFilePath);
        const nombreArchivo = secure_url;
        (0, actualizar_imagen_cloudinary_1.default)(id, tipo, nombreArchivo, body);
        res.json("por fi");
    }
});
exports.actualizarFallecidoCloudinary = actualizarFallecidoCloudinary;
const borrarFuturos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const futuros = yield futuros_1.default.findByPk(id);
        if (!futuros) {
            return res.status(404).json({
                ok: false,
                msg: "No existe fallecido con el ID: " + id,
            });
        }
        yield futuros.destroy();
        res.json(futuros);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`,
        });
    }
});
exports.borrarFuturos = borrarFuturos;
const actualizarFuturos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    const { id } = req.params;
    try {
        const futuros = yield futuros_1.default.findByPk(id);
        if (!futuros) {
            return res.status(404).json({
                ok: false,
                msg: "No existe ningun fallecido con el id " + id,
            });
        }
        yield futuros.update(body);
        res.json(futuros);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`,
        });
    }
});
exports.actualizarFuturos = actualizarFuturos;
const deleteFallecido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const fallecido = yield fallecido_1.default.findByPk(id);
        if (!fallecido) {
            return res.status(404).json({
                ok: false,
                msg: "No existe usuario con el ID: " + id,
            });
        }
        yield fallecido.destroy();
        res.json(fallecido);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`,
        });
    }
});
exports.deleteFallecido = deleteFallecido;
//# sourceMappingURL=futuros.js.map