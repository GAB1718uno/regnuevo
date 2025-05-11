import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Usuario from './usuario';
import Fallecido from './fallecido';

export interface IComentario extends Model {
    id?:string,
    usuarioId?:typeof Usuario,
    fallecidoId?: typeof Fallecido,
    comentado?:boolean,
    comentaio?:string,
    createdAt?:string,
    updateAt?: string
  }

const Comentario = db.define<IComentario>('Comentario', {

    usuarioId: {
        type: DataTypes.STRING
    },
    fallecidoId: {
        type: DataTypes.STRING
    },
    comentado: {
        type: DataTypes.BOOLEAN
    },
    comentario:{
        type:DataTypes.STRING
    }
    
},
    {
        tableName:'Comentarios',
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

export default Comentario;