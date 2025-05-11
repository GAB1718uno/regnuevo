import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

export interface IHistoria extends Model {
    id?:string,
    anyo?:string,
    texto?:number,
    img?: string,
    estado?: string,
    fallecidoId?:string,
    }

const Historia = db.define<IHistoria>('Historia', {
    anyo: {
        type: DataTypes.STRING
    },
    texto: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    },
    fallecidoId: {
        type: DataTypes.STRING
    }
},
    {
        tableName:'historias',
    }

);

export default Historia;