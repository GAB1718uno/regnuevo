"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJwt = (uid, usuario, email, avatar) => {
    // Validar que la clave secreta esté definida
    if (!process.env.SECRET_JWT_SEED) {
        throw new Error("La variable de entorno SECRET_JWT_SEED no está definida");
    }
    // Definir el payload del token
    const payload = {
        sub: uid,
        name: usuario,
        email,
        avatar,
    };
    // Devolver una promesa con el token generado
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: "60d" }, // Token válido por 60 días
        (err, token) => {
            if (err) {
                console.error("Error al generar el token:", err);
                reject(new Error("No se pudo generar el token"));
            }
            else {
                resolve(token); // Asegúrate de que token no sea undefined
            }
        });
    });
};
exports.default = generarJwt;
/* import jwt from "jsonwebtoken";

const generarJwt = ( uid:any, usuario:any, email:any, avatar:any) => {

    const payload = {
        uid,
        usuario
    }

    return new Promise ( (resolve, reject) => {

        jwt.sign( payload, process.env.SECRET_JWT_SEED!, {

            expiresIn:'60d'
        }, (err, token) => {
                // TODO MAL
            if (err){
                    reject( err );
            } else
            //TODO BIEN
            resolve( token )
    
        })

    } )

}

export default generarJwt; */ 
//# sourceMappingURL=jwt.js.map