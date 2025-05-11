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
exports.obtenerSepultura = exports.obtenerSepulturas = exports.deleteSepultura = exports.crearSepultura = exports.actualizarSepulturaCloudinary = exports.actualizarSepultura = exports.obtenerFallecidosSepultura = exports.obtenerFallecidosPorSepultura = exports.crearSepulturaCloudinary = exports.obtenerSepulturaCribada = void 0;
const uuid_1 = require("uuid");
const sepultura_1 = __importDefault(require("../models/sepultura"));
const fallecido_1 = __importDefault(require("../models/fallecido"));
const fs_1 = __importDefault(require("fs"));
const validarExtensionCorte_1 = require("../helpers/validarExtensionCorte");
const cloudinary_1 = require("cloudinary");
const sequelize_1 = require("sequelize");
const obtenerSepulturaCribada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busqueda = req.params.termino;
    const [calle, numero] = busqueda.split(",");
    const sepulturas = yield sepultura_1.default.findAll({
        limit: 10,
        where: {
            calle: {
                [sequelize_1.Op.like]: "%" + calle.trim() + "%",
            },
            numero: numero
                ? {
                    [sequelize_1.Op.like]: "%" + numero.trim() + "%",
                }
                : "",
        }
    });
    console.log(sepulturas);
    res.json(sepulturas);
    /* res.status(400).json({
              msg: `Hable con el Administrador`
          }) */
});
exports.obtenerSepulturaCribada = obtenerSepulturaCribada;
const crearSepulturaCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const body = req.body;
    const tipo = req.params.tipo;
    // Procesar la carga de la imagen
    const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
    const validando = (0, validarExtensionCorte_1.validarExtensionCorte)(file);
    if (!validando) {
        console.log("llego hasta aqui");
        res.status(404).json({
            ok: true,
            msg: "La extension no es válida",
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
            console.log("Sepultura creada en base de datos y archivo en Cloudinary");
            res.json(sepultura);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: `Hable con el Administrador`,
            });
        }
    }
});
exports.crearSepulturaCloudinary = crearSepulturaCloudinary;
/* export const obtenerFallecidosPorSepultura = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  // Validación básica del ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({
      ok: false,
      msg: 'El ID de la sepultura debe ser un número válido',
    });
  }

  try {
    // Opciones de la consulta
    options:Findoptions = {
      where: { sepulturaId: id },
      attributes: [
        'id',
        'nombre',
        'apellidos',
        'fechaFallecimiento',
        'avatar',
        'sepult',
        'sepulturaId',
        // Agrega otros campos que necesites
      ],
      order: [
        ['fechaFallecimiento', 'DESC'], // Ordenar por fecha de fallecimiento (más reciente primero)
      ],
    };

    const fallecidos = await Fallecido.findAll(options);

    if (fallecidos.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontraron fallecidos para esta sepultura',
      });
    }

    return res.json({
      ok: true,
      count: fallecidos.length,
      fallecidos,
    });

  } catch (error) {
    console.error('Error en obtenerFallecidosPorSepultura:', error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor al obtener los fallecidos',
      error: process.env.NODE_ENV === 'development' ? error : null,
    });
  }
}; */
const obtenerFallecidosPorSepultura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            ok: false,
            msg: 'El ID de la sepultura debe ser un número válido',
        });
    }
    try {
        // Opciones sin tipo explícito pero con sintaxis correcta
        const options = {
            where: { sepulturaId: id },
            attributes: ['id', 'nombre', 'apellidos', 'fechaFallecimiento', 'avatar'],
            order: [['fechaFallecimiento', 'DESC']], // Tipo explícito para order
        };
        const fallecidos = yield fallecido_1.default.findAll(options);
        // Resto del código...
    }
    catch (error) {
        // Manejo de errores
    }
});
exports.obtenerFallecidosPorSepultura = obtenerFallecidosPorSepultura;
const obtenerFallecidosSepultura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const fallecidossepultura = yield fallecido_1.default.findAll({
            where: { sepulturaId: id },
        });
        return res.json(fallecidossepultura);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: `Hable con el Administrador`,
        });
    }
});
exports.obtenerFallecidosSepultura = obtenerFallecidosSepultura;
const actualizarSepultura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    //Validamos que exista un archivo en envio
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: "No files were uploaded.",
        });
    }
    //Procesar archivo
    const file = req.files.file;
    console.log(file);
    const fileCortado = file.name.split(".");
    const extensionArchivo = fileCortado[fileCortado.length - 1];
    const extensionesValidas = ["png", "jpg", "jpeg", "svg", "gif"];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: "Extension de archivo no permitida",
        });
    }
    //Generar nombre del archivo
    const nombreArchivo = `${(0, uuid_1.v4)()}.${extensionArchivo}`;
    console.log(file);
    console.log(nombreArchivo);
    const filename = nombreArchivo;
    //path de archivo
    const tipo = req.body.tipo;
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    //Mover
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
    });
    try {
        const sepultura = yield sepultura_1.default.findByPk(id);
        console.log(sepultura);
        if (!sepultura) {
            return res.status(404).json({
                ok: false,
                msg: "No existe sepultura con el ID",
            });
        }
        body.avatar = nombreArchivo;
        yield sepultura.update(body);
        return res.json(sepultura);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: `Hable con el Administrador`,
        });
    }
});
exports.actualizarSepultura = actualizarSepultura;
const actualizarSepulturaCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    //Validamos que exista un archivo en envio
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: "No files were uploaded.",
        });
    }
    //Procesar archivo
    const file = req.files.file;
    console.log(file);
    const fileCortado = file.name.split(".");
    const extensionArchivo = fileCortado[fileCortado.length - 1];
    const extensionesValidas = ["png", "jpg", "jpeg", "svg", "gif"];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: "Extension de archivo no permitida",
        });
    }
    //Generar nombre del archivo
    const nombreArchivo = `${(0, uuid_1.v4)()}.${extensionArchivo}`;
    console.log(file);
    console.log(nombreArchivo);
    const filename = nombreArchivo;
    //path de archivo
    const tipo = req.body.tipo;
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    //Mover
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
    });
    try {
        const sepultura = yield sepultura_1.default.findByPk(id);
        console.log(sepultura);
        if (!sepultura) {
            return res.status(404).json({
                ok: false,
                msg: "No existe sepultura con el ID",
            });
        }
        body.avatar = nombreArchivo;
        yield sepultura.update(body);
        return res.json(sepultura);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: `Hable con el Administrador`,
        });
    }
});
exports.actualizarSepulturaCloudinary = actualizarSepulturaCloudinary;
const crearSepultura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    //Validamos que exista un archivo en envio
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: "No files were uploaded.",
        });
    }
    //Procesar archivo
    const file = req.files.file;
    console.log(file);
    const fileCortado = file.name.split(".");
    const extensionArchivo = fileCortado[fileCortado.length - 1];
    const extensionesValidas = ["png", "jpg", "jpeg", "svg", "gif"];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: "Extension de archivo no permitida",
        });
    }
    //Generar nombre del archivo
    const nombreArchivo = `${(0, uuid_1.v4)()}.${extensionArchivo}`;
    console.log(file);
    console.log(nombreArchivo);
    //path de archivo
    const tipo = req.body.tipo;
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    //const path = `http://167.71.36.17:3000/uploads/${tipo}/${nombreArchivo}`;
    console.log(path);
    //Mover
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        res.status(200).json({
            ok: true,
            msg: "Archivo Creado con exito",
        });
    });
    body.tipo = tipo;
    body.avatar = nombreArchivo;
    try {
        const sepultura = sepultura_1.default.build(body);
        yield sepultura.save();
        console.log("Sepultura creada con exito");
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: `Hable con el Administrador`,
        });
    }
});
exports.crearSepultura = crearSepultura;
const deleteSepultura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const sepultura = yield sepultura_1.default.findByPk(id);
        if (!sepultura) {
            return res.status(404).json({
                ok: false,
                msg: "No existe sepultura con el ID: " + id,
            });
        }
        let tipo = sepultura.tipo;
        let avatar = sepultura.avatar;
        //eliminar la imagen de la BD
        const path = `./uploads/${tipo}/${avatar}`;
        console.log(path);
        if (fs_1.default.existsSync(path)) {
            fs_1.default.unlinkSync(path);
        }
        yield sepultura.destroy();
        return res.json({
            ok: true,
            msg: "Se ha eliminado de la Base de Datos lo abajo especificado: ",
            sepultura,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: `Hable con el Administrador`,
        });
    }
});
exports.deleteSepultura = deleteSepultura;
const obtenerSepulturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sepultura = yield sepultura_1.default.findAll();
        if (sepultura.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "No existe sepulturas en la Base de Datos",
            });
        }
        return res.json(sepultura);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: `Hable con el Administrador`,
        });
    }
});
exports.obtenerSepulturas = obtenerSepulturas;
const obtenerSepultura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const sepultura = yield sepultura_1.default.findByPk(id);
        if (!sepultura) {
            return res.status(404).json({
                ok: false,
                msg: "No existe usuario con el ID: " + id,
            });
        }
        return res.json(sepultura);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: `Hable con el Administrador`,
        });
    }
});
exports.obtenerSepultura = obtenerSepultura;
//# sourceMappingURL=sepulturas.js.map