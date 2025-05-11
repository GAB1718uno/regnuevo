"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Likes = connection_1.default.define('Likes', {
    usuarioId: {
        type: sequelize_1.DataTypes.STRING
    },
    fallecidoId: {
        type: sequelize_1.DataTypes.STRING
    },
    like: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    valor: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'likes',
});
/* Sepultura.hasMany(Fallecido, {
    foreignKey:'sepulturaId',
    sourceKey:'id'
})

Fallecido.belongsTo(Sepultura, {
    foreignKey:'sepulturaId',
    targetKey:'id'
}) */
exports.default = Likes;
//# sourceMappingURL=likes.js.map