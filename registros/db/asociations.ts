import Fallecido from "../models/fallecido";
import Sepultura from "../models/sepultura";
import uploads from "../models/uploads";
import usuario from "../models/usuario";

Fallecido.hasOne(Sepultura);

Fallecido.belongsTo(Sepultura);