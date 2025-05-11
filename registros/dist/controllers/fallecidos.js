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
exports.deleteFallecido = exports.putFallecidoFavorito = exports.putFallecido = exports.actualizarFallecidoCloudinary = exports.actulizarFallecidoFavorito = exports.postFallecidos = exports.crearFallecidoCloudinary = exports.getFallecido = exports.getFallecidosTodos = exports.getFallecidos = exports.getFallecidosCriba = exports.getFallecidosCribaNyA = exports.obtenerRelacionado = exports.obtenerFallecidosPorSepultura = exports.obtenerFallecidosPorSepulturaReserva = void 0;
const sequelize_1 = require("sequelize");
const validarExtensionCorte_1 = require("../helpers/validarExtensionCorte");
const fallecido_1 = __importDefault(require("../models/fallecido"));
const cloudinary_1 = require("cloudinary");
const actualizar_imagen_cloudinary_1 = __importDefault(require("../helpers/actualizar-imagen-cloudinary"));
const obtenerFallecidosPorSepulturaReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(JSON.stringify(req.params));
    try {
        const fallecidos = yield fallecido_1.default.findAll({
            where: { sepulturaId: Number(id) },
            /* attributes: ['id', 'nombre', 'apellidos', 'fechaFallecimiento', 'avatar'], */
            order: [
                ['name', 'DESC'] // Formato correcto para order
            ],
        });
        console.log(fallecidos);
        return res.json({
            success: true,
            data: fallecidos,
            count: fallecidos.length
        });
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener fallecidos'
        });
    }
});
exports.obtenerFallecidosPorSepulturaReserva = obtenerFallecidosPorSepulturaReserva;
const obtenerFallecidosPorSepultura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const calle = decodeURIComponent(req.params.calle);
    const numero = decodeURIComponent(req.params.numero);
    console.log(calle, numero);
    const sepult = calle + ", " + numero;
    try {
        const fallecidos = yield fallecido_1.default.findAll({
            where: { sepult: sepult },
            order: [['name', 'DESC']],
        });
        // Enviar directamente el array sin envolverlo en otro objeto
        return res.json(fallecidos);
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error al obtener fallecidos' });
    }
});
exports.obtenerFallecidosPorSepultura = obtenerFallecidosPorSepultura;
const obtenerRelacionado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sepult } = req.params;
    const { sepulturaId } = req.params;
    console.log("LA SEPULTURA ES LA DE LA CALLE: " + sepult);
    const muerto = yield fallecido_1.default.findAll({
        where: {
            //sepulturaId:sepulturaId
            sepult: sepult,
        },
    });
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
const getFallecidosCribaNyA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Supongamos que recibes los parámetros como params query strings
    // Ejemplo: /api/fallecidos?nombre=Geronimo&apellido=alc
    const nombreRecogido = decodeURIComponent(req.params.nombre);
    const apellidos = decodeURIComponent(req.params.apellidos);
    console.log(nombreRecogido, apellidos);
    // Se arma la cláusula where en base a los parámetros recibidos
    let whereClause = {};
    if (nombreRecogido !== "todos" && apellidos !== "todos") {
        console.log("Estamos en la " + nombreRecogido, apellidos);
        // Si se pasan ambos, se filtra en ambos campos
        whereClause = {
            name: { [sequelize_1.Op.like]: "%" + nombreRecogido + "%" },
            apellidos: { [sequelize_1.Op.like]: "%" + apellidos + "%" },
        };
    }
    else if (nombreRecogido !== "todos") {
        // Si solo se pasa nombre, se filtra solo en nombres
        console.log(nombreRecogido);
        whereClause = {
            name: { [sequelize_1.Op.like]: "%" + nombreRecogido + "%" },
        };
    }
    else if (apellidos !== "todos") {
        // Si solo se pasa apellido, se filtra solo en apellidos
        whereClause = {
            apellidos: { [sequelize_1.Op.like]: "%" + apellidos + "%" },
        };
    }
    const fallecidos = yield fallecido_1.default.findAll({
        limit: 10,
        where: whereClause,
    });
    res.json(fallecidos);
});
exports.getFallecidosCribaNyA = getFallecidosCribaNyA;
const getFallecidosCriba = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tipo = req.params.tipo;
    const busqueda = req.params.termino;
    console.log(tipo, busqueda);
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
const getFallecidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Paramnetros recibidos: " + JSON.stringify(req.params, null, 2));
    console.log("El valor de pageSize es actualmente: " + req.params.pageSize);
    let pageSize = parseInt(req.params.pageSize) || 20;
    console.log("El valor de pageSize es ahora: " + pageSize);
    let page = parseInt(req.params.page) || 1;
    if (isNaN(pageSize) || pageSize <= 0) {
        return res
            .status(400)
            .json({
            error: 'El parámetro "pageSize" debe ser un número entero mayor que cero',
        });
    }
    if (isNaN(page) || page <= 0) {
        page = 1;
    }
    const offset = (page - 1) * pageSize;
    console.log(page);
    const fallecidos = yield fallecido_1.default.findAndCountAll({
        order: [["fallecio", "DESC"]],
        limit: pageSize,
        offset,
    });
    res.json(fallecidos);
});
exports.getFallecidos = getFallecidos;
//Obtener fallecidos por limite
/* export const getFallecidos = async (req: Request, res: Response) => {
    const limit = parseInt(req.params.limit);
    const offset = parseInt(req.params.offset);

    
    const fallecidos = await Fallecido.findAll({
        order: [['fallecio', 'DESC']],
        limit,
        offset
    });

    res.json(fallecidos)

} */
// Obtener fallecidos de forma normal
const getFallecidosTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fallecidos = yield fallecido_1.default.findAll();
    res.json(fallecidos);
});
exports.getFallecidosTodos = getFallecidosTodos;
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
    console.log("Archivos recibidos:", JSON.stringify(req.files, null, 2));
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
            console.log("Aqui estamos para ver que pasa: " + validando);
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
const postFallecidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    console.log(body);
    try {
        const fallecidos = fallecido_1.default.build(body);
        yield fallecidos.save();
        console.log("Fallecido creado en base de datos");
        res.json(fallecidos);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`,
        });
    }
});
exports.postFallecidos = postFallecidos;
const actulizarFallecidoFavorito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const id = req.params.id;
    try {
        const fallecido = yield fallecido_1.default.findByPk(id);
        if (!fallecido) {
            return res.status(404).json({
                ok: false,
                msg: "No existe ningun fallecido con el id " + id,
            });
        }
        yield fallecido.update(body);
        res.json(fallecido);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`,
        });
    }
});
exports.actulizarFallecidoFavorito = actulizarFallecidoFavorito;
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
const putFallecido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const fallecido = yield fallecido_1.default.findByPk(id);
        if (!fallecido) {
            return res.status(404).json({
                ok: false,
                msg: "No existe ningun fallecido con el id " + id,
            });
        }
        yield fallecido.update(body);
        res.json(fallecido);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`,
        });
    }
});
exports.putFallecido = putFallecido;
const putFallecidoFavorito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const fallecido = yield fallecido_1.default.findByPk(id);
        if (!fallecido) {
            return res.status(404).json({
                ok: false,
                msg: "No existe ningun fallecido con el id " + id,
            });
        }
        yield fallecido.update(body);
        res.json(fallecido);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`,
        });
    }
});
exports.putFallecidoFavorito = putFallecidoFavorito;
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
//# sourceMappingURL=fallecidos.js.map