"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarExtensionCorte = void 0;
const validarExtensionCorte = (file) => {
    console.log(file + " dentro del validarCorte");
    //Cortamos el nombre del archivo y separamos extension
    const fileCortado = file.name.split('.');
    const extensionArchivo = fileCortado[fileCortado.length - 1];
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'svg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return false;
    }
    else {
        return true;
    }
};
exports.validarExtensionCorte = validarExtensionCorte;
//# sourceMappingURL=validarExtensionCorte.js.map