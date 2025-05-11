"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiposPermitidos = void 0;
const tiposPermitidos = (tipo = '', tipos = []) => {
    const incluida = tipos.includes(tipo);
    if (!incluida) {
        throw new Error(`El tipo no es permitido. No corresponde a, ${tipos}`);
    }
    return true;
};
exports.tiposPermitidos = tiposPermitidos;
//# sourceMappingURL=tiposPermitidos.js.map