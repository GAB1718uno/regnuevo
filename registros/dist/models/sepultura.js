"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const fallecido_1 = __importDefault(require("./fallecido"));
const Sepultura = connection_1.default.define('Sepultura', {
    calle: {
        type: sequelize_1.DataTypes.STRING
    },
    numero: {
        type: sequelize_1.DataTypes.STRING
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    tableName: 'sepulturas',
});
Sepultura.hasMany(fallecido_1.default, {
    foreignKey: 'sepulturaId',
    sourceKey: 'id'
});
fallecido_1.default.belongsTo(Sepultura, {
    foreignKey: 'sepulturaId',
    targetKey: 'id'
});
exports.default = Sepultura;
//# sourceMappingURL=sepultura.js.map