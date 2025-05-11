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
const sepultura_1 = __importDefault(require("../models/sepultura"));
const cloudinary_1 = require("cloudinary");
const fallecido_1 = __importDefault(require("../models/fallecido"));
const usuario_1 = __importDefault(require("../models/usuario"));
const actualizarImagen = (id, tipo, nombreArchivo, body) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Va todo bien');
    switch (tipo) {
        case 'usuarios':
            const usuario = yield usuario_1.default.findByPk(id);
            if (usuario.avatar) {
                console.log(usuario.avatar);
                //Creamos una constante con el valor del campo
                const urlEnBD = usuario.avatar;
                //Creamos un array a partir de la url, sabiendo que en el ultimo peldaño estará el nombre del archivo
                //https://res.cloudinary.com/ddxm1pvmd/image/upload/v1664959310/ymxhbyyzi8nvq1klvtwf.png
                const arrayDeUrl = urlEnBD.split('/');
                console.log(arrayDeUrl);
                //Creamos una constante con el nombre del archivo, el ultimo elemento del array
                const urlCortada = arrayDeUrl[arrayDeUrl.length - 1];
                console.log(urlCortada);
                //Extraimos el [public_id] como está establecido en cloudinary, que viene a ser el nombre del archivo sin la extensión
                const [public_id] = urlCortada.split('.');
                //Destruimos el archivo fisico almacenado en cloudinary
                yield cloudinary_1.v2.uploader.destroy(public_id);
            }
            usuario.avatar = nombreArchivo;
            body.url = usuario.avatar;
            yield usuario.update(body);
            return true;
            break;
        case 'fallecidos':
            const fallecido = yield fallecido_1.default.findByPk(id);
            if (fallecido.url) {
                console.log(fallecido.url);
                //Creamos una constante con el valor del campo
                const urlEnBD = fallecido.url;
                //Creamos un array a partir de la url, sabiendo que en el ultimo peldaño estará el nombre del archivo
                //https://res.cloudinary.com/ddxm1pvmd/image/upload/v1664959310/ymxhbyyzi8nvq1klvtwf.png
                const arrayDeUrl = urlEnBD.split('/');
                console.log(arrayDeUrl);
                //Creamos una constante con el nombre del archivo, el ultimo elemento del array
                const urlCortada = arrayDeUrl[arrayDeUrl.length - 1];
                console.log(urlCortada);
                //Extraimos el [public_id] como está establecido en cloudinary, que viene a ser el nombre del archivo sin la extensión
                const [public_id] = urlCortada.split('.');
                //Destruimos el archivo fisico almacenado en cloudinary
                yield cloudinary_1.v2.uploader.destroy(public_id);
            }
            fallecido.url = nombreArchivo;
            body.url = fallecido.url;
            yield fallecido.update(body);
            return true;
            break;
        case 'sepulturas':
            const sepultura = yield sepultura_1.default.findByPk(id);
            console.log(sepultura);
            //Borrado en cloudinary
            console.log(sepultura.avatar);
            console.log(nombreArchivo);
            if (sepultura.avatar) {
                const nombreArchivoBD = sepultura.avatar;
                // Cloudinary recortar nombre
                const avatarArray = nombreArchivoBD.split('/');
                console.log(avatarArray);
                const avatarCortado = avatarArray[avatarArray.length - 1];
                //Desestructuramos el public_id de Cloudinary y obtenemos el nombre sin extensión
                const [public_id] = avatarCortado.split('.');
                console.log(public_id);
                yield cloudinary_1.v2.uploader.destroy(public_id);
            }
            sepultura.avatar = nombreArchivo;
            body.avatar = sepultura.avatar;
            yield sepultura.update(body);
            return true;
            break;
        default:
            break;
    }
});
exports.default = actualizarImagen;
//# sourceMappingURL=actualizar-imagen-cloudinary.js.map