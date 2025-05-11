

export interface IUser extends Model {
  id?: string,
  rol?:string,
  estado?:number,
  usuario?: string,
  password?: string,
  email?: string,
  avatar?:string,
  createdAt?:string,
  updateAt?: string
}


import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Perfil from './perfiles';

const Usuario = db.define<IUser>('Usuario', {
  
    usuario: {
        type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    rol: {
      type:DataTypes.STRING
    },
    estado: {
      type:DataTypes.STRING
    },
    avatar: {
      type:DataTypes.STRING
    }
  },
    {
      tableName:'usuarios',
    }
  );

  Usuario.hasOne(Perfil, {
    foreignKey: 'usuarioId',
    sourceKey:'id'
  })

  Perfil.belongsTo(Usuario, {
    foreignKey:'usuarioId',
    targetKey:'id'
  })
  
export default Usuario