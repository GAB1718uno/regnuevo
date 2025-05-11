import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Usuario from './usuario';
import Fallecido, { IFallecido } from './fallecido'; // Importa IFallecido

export interface IFavorito extends Model {
    id?: number;         // Cambiado a number para que coincida con el tipo de ID
    userId: number;
    fallecidoId: number;
    createdAt?: Date;
    updatedAt?: Date;
    fallecido?: IFallecido; // Aquí, en lugar de typeof Fallecido, usamos IFallecido
}

const Favorito = db.define<IFavorito>("Favorito", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "usuarios", key: "id" },
  },
  fallecidoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "muertos", key: "id" },
  },
}, {
  tableName:'favoritos',
});

// Relaciones
Favorito.belongsTo(Usuario, { foreignKey: "userId" });
Favorito.belongsTo(Fallecido, { foreignKey: "fallecidoId", as: "fallecido" });

export default Favorito;
