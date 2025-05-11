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
exports.validarEmail = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const validarEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const existeEmail = yield usuario_1.default.findOne({
        where: {
            email: body.email
        }
    });
    if (existeEmail) {
        console.log("Ya esxiste un usuario con este Email" + body.email);
        return res.status(400).json({
            ok: false,
            msg: 'Ya existe un usuario con este email: ' + body.email
        });
    }
    next();
});
exports.validarEmail = validarEmail;
//# sourceMappingURL=validarEmail.js.map