"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Comentario = connection_1.default.define('Comentario', {
    usuarioId: {
        type: sequelize_1.DataTypes.STRING
    },
    fallecidoId: {
        type: sequelize_1.DataTypes.STRING
    },
    comentado: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    comentario: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'Comentarios',
});
/* Sepultura.hasMany(Fallecido, {
    foreignKey:'sepulturaId',
    sourceKey:'id'
})

Fallecido.belongsTo(Sepultura, {
    foreignKey:'sepulturaId',
    targetKey:'id'
}) */
exports.default = Comentario;
//# sourceMappingURL=comentario.js.map