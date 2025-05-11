"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const perfiles_1 = __importDefault(require("./perfiles"));
const Usuario = connection_1.default.define('Usuario', {
    usuario: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    rol: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.STRING
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'usuarios',
});
Usuario.hasOne(perfiles_1.default, {
    foreignKey: 'usuarioId',
    sourceKey: 'id'
});
perfiles_1.default.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    targetKey: 'id'
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map