"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.mostrarFile = exports.mostrarDatosFile = exports.borramosDatosFile = exports.actualizarFileCloudinary = exports.actualizarFile = exports.crearFileCloudinary = exports.crearFile = void 0;
const uuid_1 = require("uuid");
const actualizar_imagen_1 = __importDefault(require("../helpers/actualizar-imagen"));
const actualizar_imagen_cloudinary_1 = __importDefault(require("../helpers/actualizar-imagen-cloudinary"));
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const uploads_1 = __importDefault(require("../models/uploads"));
const cloudinary_1 = require("cloudinary");
const validarExtensionCorte_1 = require("../helpers/validarExtensionCorte");
const sepultura_1 = __importDefault(require("../models/sepultura"));
/* cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
  }); */
cloudinary_1.v2.config({
    cloud_name: 'ddxm1pvmd',
    api_key: '934857619637733',
    api_secret: 'XXiAdEkOs6933Qgm-whY52pwNyc'
});
//cloudinary.config(process.env.CLOUDINARY_URL!)
const crearFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const tipo = req.params.tipo.toLowerCase();
    const id = req.params.id;
    const tiposValidos = ['usuarios', 'fallecidos', 'sepulturas'];
    //Validamos que el tipo sea correcto
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: ' El tipo de archivo no es correcto'
        });
    }
    //Validamos que exista un archivo en envio
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }
    //Procesar archivo
    const file = req.files.file;
    console.log(file);
    const fileCortado = file.name.split('.');
    const extensionArchivo = fileCortado[fileCortado.length - 1];
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'svg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extension de archivo no permitida'
        });
    }
    //Generar nombre del archivo
    const nombreArchivo = `${(0, uuid_1.v4)()}.${extensionArchivo}`;
    console.log(file);
    console.log(nombreArchivo);
    //path de archivo
    const elpath = path.join(__dirname, `../../uploads/${tipo}/${nombreArchivo}`);
    //const path = `http://167.71.36.17:3000/uploads/${tipo}/${nombreArchivo}`;
    console.log(elpath);
    //Mover
    // Use the mv() method to place the file somewhere on your server
    file.mv(elpath, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        /* res.status(200).json(
            {
                ok: true,
                id,
                nombreArchivo
            }); */
    });
    body.tipo = tipo;
    body.avatar = nombreArchivo;
    switch (tipo) {
        case 'usuarios':
            const usuario = uploads_1.default.build(body);
            yield usuario.save();
            console.log(usuario);
            break;
        case 'fallecidos':
            const fallecido = uploads_1.default.build(body);
            yield fallecido.save();
            res.status(200).json({
                ok: true,
                msg: 'Creado con exito',
                body
            });
            return true;
            break;
        case 'sepulturas':
            const sepultura = uploads_1.default.build(body);
            yield sepultura.save();
            res.status(200).json({
                ok: true,
                msg: 'Creado con exito',
                body
            });
            console.log(sepultura);
            //return true;
            break;
        default:
            break;
    }
});
exports.crearFile = crearFile;
const crearFileCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const body = req.body;
    const tipo = req.params.tipo;
    // Procesar la carga de la imagen
    const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
    const validando = (0, validarExtensionCorte_1.validarExtensionCorte)(file);
    if (!validando) {
        console.log('llego hasta aqui');
        res.status(404).json({
            ok: true,
            msg: 'La extension no es válida'
        });
    }
    else {
        //actualizarImagenCloudinary(id, tipo, nombreArchivo, body)
        try {
            //Cloudinary comprobar path y nombre
            const tempFilePath = (_b = req.files) === null || _b === void 0 ? void 0 : _b.file;
            console.log(tempFilePath.tempFilePath);
            const { secure_url } = yield cloudinary_1.v2.uploader.upload(tempFilePath.tempFilePath);
            body.avatar = secure_url;
            const sepultura = sepultura_1.default.build(body);
            yield sepultura.save();
            console.log('Sepultura creada en base de datos y archivo en Cloudinary');
            res.json(sepultura);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: `Hable con el Administrador`
            });
        }
    }
});
exports.crearFileCloudinary = crearFileCloudinary;
const actualizarFile = (req, res) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['usuarios', 'fallecidos', 'sepulturas'];
    //Validamos que el tipo sea correcto
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: ' El tipo de archivo no es correcto'
        });
    }
    //Validamos que exista un archivo en envio
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }
    // Procesar la carga de la imagen
    const file = req.files.imagen;
    const fileCortado = file.name.split('.');
    const extensionArchivo = fileCortado[fileCortado.length - 1];
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'svg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extension de archivo no permitida'
        });
    }
    //Generar nombre del archivo
    const nombreArchivo = `${(0, uuid_1.v4)()}.${extensionArchivo}`;
    console.log(file);
    console.log(nombreArchivo);
    //path de archivo
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    //Mover
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        /* res.status(200).json(
            {
                ok: true,
                id,
                nombreArchivo
            }); */
    });
    (0, actualizar_imagen_1.default)(id, tipo, nombreArchivo);
};
exports.actualizarFile = actualizarFile;
const actualizarFileCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const body = req.body;
    const tipo = req.params.tipo;
    const id = req.params.id;
    // Procesar la carga de la imagen
    const file = (_c = req.files) === null || _c === void 0 ? void 0 : _c.file;
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
        console.log(tempFilePath.tempFilePath);
        const { secure_url } = yield cloudinary_1.v2.uploader.upload(tempFilePath.tempFilePath);
        const nombreArchivo = secure_url;
        console.log(nombreArchivo);
        (0, actualizar_imagen_cloudinary_1.default)(id, tipo, nombreArchivo, body);
        res.json('por fi');
    }
});
exports.actualizarFileCloudinary = actualizarFileCloudinary;
const borramosDatosFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const tipo = req.params.tipo;
    const fallecidoFiles = yield uploads_1.default.findByPk(id);
    if (!fallecidoFiles) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe usuario con el ID: ' + id
        });
    }
    yield fallecidoFiles.destroy();
    return res.json(fallecidoFiles);
});
exports.borramosDatosFile = borramosDatosFile;
const mostrarDatosFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fallecidosUploads = yield uploads_1.default.findAll();
    return res.json(fallecidosUploads);
});
exports.mostrarDatosFile = mostrarDatosFile;
const mostrarFile = (req, res) => {
    const archivo = req.params.archivo;
    const tipo = req.params.tipo.toLowerCase();
    const pathFile = path.join(__dirname, `../uploads/${tipo}/${archivo}`);
    const pathFileCortado = pathFile.replace('dist', '');
    if (fs_1.default.existsSync(pathFileCortado)) {
        return res.sendFile(pathFileCortado);
    }
    else {
        const pathFile = path.join(__dirname, `../uploads/no-image.png`);
        const pathFileCortado = pathFile.replace('dist', '');
        return res.sendFile(pathFileCortado);
    }
};
exports.mostrarFile = mostrarFile;
//# sourceMappingURL=uploads.js.map