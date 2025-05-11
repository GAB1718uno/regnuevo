"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const usuario_1 = __importDefault(require("./usuario"));
const fallecido_1 = __importDefault(require("./fallecido")); // Importa IFallecido
const Favorito = connection_1.default.define("Favorito", {
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "usuarios", key: "id" },
    },
    fallecidoId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "muertos", key: "id" },
    },
}, {
    tableName: 'favoritos',
});
// Relaciones
Favorito.belongsTo(usuario_1.default, { foreignKey: "userId" });
Favorito.belongsTo(fallecido_1.default, { foreignKey: "fallecidoId", as: "fallecido" });
exports.default = Favorito;
//# sourceMappingURL=favoritos.js.map