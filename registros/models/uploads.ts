import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

export interface IUpload extends Model {
    id?: string,
    calle?:string,
    numero?:number,
    avatar?: string,
    tipo: string,
    titulo?: string,
    descripcion?: string,
    createdAt?:string,
    updateAt?: string
  }

const Uploads = db.define('Uploads', {
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
    titulo:{
        type: DataTypes.STRING
    },
    descripcion:{
        type: DataTypes.STRING
    },
},
    {
        tableName:'uploads',
    }

);


export default Uploads;