import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

export interface IFuturos extends Model {
  id?: string;
  nombre?: string;
  apellidos?: string;
  fecha_defuncion?: Date;
  fecha_entierro?: Date;
  local_sepelio?: string;
  hora_entierro?: string;
}

const Futuros = db.define<IFuturos>(
  "Futuros",
  {
    nombre: {
      type: DataTypes.STRING,
    },
    apellidos: {
      type: DataTypes.STRING,
    },
    fecha_defuncion: {
      type: DataTypes.DATE,
    },
    fecha_entierro: {
      type: DataTypes.DATE,
    },
    local_sepelio: {
      type: DataTypes.STRING,
    },
    hora_entierro: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "futuros",
  }
);

export default Futuros;
