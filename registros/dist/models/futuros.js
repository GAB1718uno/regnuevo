"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Futuros = connection_1.default.define("Futuros", {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    apellidos: {
        type: sequelize_1.DataTypes.STRING,
    },
    fecha_defuncion: {
        type: sequelize_1.DataTypes.DATE,
    },
    fecha_entierro: {
        type: sequelize_1.DataTypes.DATE,
    },
    local_sepelio: {
        type: sequelize_1.DataTypes.STRING,
    },
    hora_entierro: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    tableName: "futuros",
});
exports.default = Futuros;
//# sourceMappingURL=futuros.js.map