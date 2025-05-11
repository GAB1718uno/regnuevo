import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Fallecido from './fallecido';

export interface ISepultura extends Model {
    id?:string,
    calle?:string,
    numero?:number,
    avatar?: string,
    tipo?: string,
    createdAt?:string,
    updateAt?: string
  }

const Sepultura = db.define<ISepultura>('Sepultura', {

    calle: {
        type: DataTypes.STRING
    },
    numero: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.STRING
    },
    tipo: {
        type: DataTypes.STRING
    },
    
},
    {
        tableName:'sepulturas',
    }

    

);
Sepultura.hasMany(Fallecido, {
    foreignKey:'sepulturaId',
    sourceKey:'id'
})

Fallecido.belongsTo(Sepultura, {
    foreignKey:'sepulturaId',
    targetKey:'id'
})

export default Sepultura;