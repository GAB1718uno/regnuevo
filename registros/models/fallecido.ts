import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Favorito from './favoritos';

export interface IFallecido extends Model {
    id?: number;
    name?: string;
    apellidos?: string;
    nacio?: string;
    mote?: string;
    fallecio?: string;
    url?: string;
    url2?: string;
    sepult?: string;
    favorito?: number;
    likes?: number;
    createdAt?: string;
    updatedAt?: string;
}

const Fallecido = db.define<IFallecido>('Fallecido', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nacio: {
        type: DataTypes.STRING,
    },
    fallecio: {
        type: DataTypes.STRING,
    },
    mote: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    },
    url2: {
        type: DataTypes.STRING,
    },
    sepult: {
        type: DataTypes.STRING,
    },
    favorito: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'muertos',
    timestamps: true,
});

export default Fallecido;
