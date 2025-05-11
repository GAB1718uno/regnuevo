import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Fallecido from './fallecido';
import Usuario from './usuario';

export interface ILikes extends Model {
    id?:string,
    usuarioId?:typeof Usuario,
    fallecidoId?: string,
    like?:boolean,
    valor?:string,
    createdAt?:string,
    updateAt?: string
  }

const Likes = db.define<ILikes>('Likes', {

    usuarioId: {
        type: DataTypes.STRING
    },
    fallecidoId: {
        type: DataTypes.STRING
    },
    like: {
        type: DataTypes.BOOLEAN
    },
    valor:{
        type:DataTypes.STRING
    }
    
},
    {
        tableName:'likes',
    }

    

);

/* Sepultura.hasMany(Fallecido, {
    foreignKey:'sepulturaId',
    sourceKey:'id'
})

Fallecido.belongsTo(Sepultura, {
    foreignKey:'sepulturaId',
    targetKey:'id'
}) */

export default Likes;