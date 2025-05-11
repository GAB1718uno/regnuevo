"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Historia = connection_1.default.define('Historia', {
    anyo: {
        type: sequelize_1.DataTypes.STRING
    },
    texto: {
        type: sequelize_1.DataTypes.STRING
    },
    img: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.STRING
    },
    fallecidoId: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'historias',
});
exports.default = Historia;
//# sourceMappingURL=historia.js.map