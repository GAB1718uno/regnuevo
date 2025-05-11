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
const fs_1 = __importDefault(require("fs"));
const uploads_1 = __importDefault(require("../models/uploads"));
const actualizarImagen = (id, tipo, nombreArchivo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Va todo bien');
    switch (tipo) {
        case 'usuarios':
            const usuario = uploads_1.default.findByPk(id);
            console.log(usuario);
            break;
        case 'fallecidos':
            const fallecido = yield uploads_1.default.findByPk(id);
            console.log(fallecido.avatar);
            const pathViejo = `uploads/fallecidos/${fallecido.avatar}`;
            if (fs_1.default.existsSync(pathViejo)) {
                fs_1.default.unlinkSync(pathViejo);
                fallecido.avatar = nombreArchivo;
                yield fallecido.save();
                return true;
            }
            else {
                const pathNuevo = `uploads/fallecidos/${fallecido.avatar}`;
                fallecido.avatar = nombreArchivo;
                yield fallecido.save();
                return true;
            }
            break;
        case 'sepulturas':
            const sepultura = uploads_1.default.findByPk(id);
            console.log(sepultura);
            break;
        default:
            break;
    }
});
exports.default = actualizarImagen;
//# sourceMappingURL=actualizar-imagen.js.map