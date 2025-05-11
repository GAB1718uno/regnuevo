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
exports.deleteUsuario = exports.actualizarPerfilUsuario = exports.crearPerfilCloudinary = exports.actualizarPerfilCloudinary = exports.crearPerfil = exports.obtenerPerfilPorId = exports.obtenerPerfiles = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const cloudinary_1 = require("cloudinary");
const validarExtensionCorte_1 = require("../helpers/validarExtensionCorte");
const perfiles_1 = __importDefault(require("../models/perfiles"));
const obtenerPerfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const perfiles = yield perfiles_1.default.findAll();
    res.json(perfiles);
});
exports.obtenerPerfiles = obtenerPerfiles;
const obtenerPerfilPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const perfil = yield perfiles_1.default.findByPk(id);
    try {
        if (perfil) {
            res.json(perfil);
            /* res.status(200).json({
                ok:true,
                usuario
                }) */
        }
        else {
            res.status(404).json({
                msg: `No existe perfil para el usuario con este ID`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Hable con administrador`
        });
    }
});
exports.obtenerPerfilPorId = obtenerPerfilPorId;
const crearPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const { body } = req;
        //const salt = bcrypt.genSaltSync(10);
        //req.body.password = bcrypt.hashSync(req.body.password, salt)
        const perfil = yield perfiles_1.default.create(body);
        /* const usuario = Usuario.build( req.body )
        
        await usuario.save(); */
        console.log(perfil.id);
        //Generando Token/* 
        //const token = await generarJwt(usuario.id, usuario.usuario, usuario.email, usuario.avatar);
        //console.log(token)
        res.status(201).json({
            ok: true,
            msg: "Perfil creado con éxito",
            uid: perfil.id,
            email: perfil.identidad
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`,
            ok: false,
            error
        });
    }
});
exports.crearPerfil = crearPerfil;
const actualizarPerfilCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(req.body);
    const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
    const validarExtension = (0, validarExtensionCorte_1.validarExtensionCorte)(file);
    if (!validarExtension) {
        res.status(404).json({
            ok: false,
            msg: 'La extension del archivo no es válida'
        });
    }
    else {
        try {
            const { body } = req;
            const { id } = req.params;
            //Cloudinary comprobar path y nombre
            const tempFilePath = (_b = req.files) === null || _b === void 0 ? void 0 : _b.file;
            console.log(tempFilePath.tempFilePath);
            const { secure_url } = yield cloudinary_1.v2.uploader.upload(tempFilePath.tempFilePath);
            body.avatar = secure_url;
            const perfilUsuario = yield perfiles_1.default.findByPk(id);
            if (!perfilUsuario) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe perfil del usuario'
                });
            }
            yield perfilUsuario.update(body);
            res.status(201).json({
                ok: true,
                msg: "Perfil actualizado con éxito",
                uid: perfilUsuario.id,
                usuario: perfilUsuario.nombreUsuario,
                nombre: perfilUsuario.nombre,
                avatar: perfilUsuario.avatar
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: `Hable con el Administrador`,
                ok: false,
                error
            });
        }
    }
});
exports.actualizarPerfilCloudinary = actualizarPerfilCloudinary;
const crearPerfilCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { body } = req;
    console.log(req.body);
    const file = (_c = req.files) === null || _c === void 0 ? void 0 : _c.file;
    if (!file) {
        body.avatar = 'https://res.cloudinary.com/ddxm1pvmd/image/upload/v1669648194/nlnoip90imlo1gu7aezm.png';
    }
    else {
        const validarExtension = (0, validarExtensionCorte_1.validarExtensionCorte)(file);
        if (!validarExtension) {
            res.status(404).json({
                ok: false,
                msg: 'La extension del archivo no es válida'
            });
        }
        else {
            //Cloudinary comprobar path y nombre
            const tempFilePath = (_d = req.files) === null || _d === void 0 ? void 0 : _d.file;
            console.log(tempFilePath.tempFilePath);
            const { secure_url } = yield cloudinary_1.v2.uploader.upload(tempFilePath.tempFilePath);
            body.avatar = secure_url;
        }
        try {
            const perfil = yield perfiles_1.default.create(body);
            console.log(perfil.id);
            //Generando Token/* 
            res.status(201).json({
                ok: true,
                msg: "Perfil creado con éxito",
                perfil
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: `Hable con el Administrador`,
                ok: false,
                error
            });
        }
    }
});
exports.crearPerfilCloudinary = crearPerfilCloudinary;
const actualizarPerfilUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    console.log(body);
    const { id } = req.params;
    try {
        const perfilUsuario = yield perfiles_1.default.findByPk(id);
        if (!perfilUsuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe perfil del usuario'
            });
        }
        yield perfilUsuario.update(body);
        res.json(perfilUsuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.actualizarPerfilUsuario = actualizarPerfilUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con el ID: ' + id
            });
        }
        /* await usuario.update( { estado: false }) */
        yield usuario.destroy();
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=perfiles.js.map