import { Request, Response } from "express";
import { Op } from "sequelize";
import { validarExtensionCorte } from "../helpers/validarExtensionCorte";
import Fallecido from "../models/fallecido";
import { v2 as cloudinary } from "cloudinary";
import actualizarImagenCloudinary from "../helpers/actualizar-imagen-cloudinary";
import Futuros from "../models/futuros";

export const obtenerRelacionado = async (req: Request, res: Response) => {
  const { sepult } = req.params;

  console.log(sepult);

  const muerto = await Fallecido.findAll({ where: { sepult: sepult } });

  try {
    if (!sepult) {
      res.json(muerto);
    }
    return res.json(muerto);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Hable con el Administrador`,
    });
  }
};

export const getFallecidosCriba = async (req: Request, res: Response) => {
  const tipo = req.params.tipo;
  const busqueda = req.params.termino;

  switch (tipo) {
    case "apellido":
      const fallecidos = await Fallecido.findAll({
        limit: 10,
        where: {
          apellidos: {
            [Op.like]: "%" + busqueda + "%",
          },
        },
      });

      res.json(fallecidos);

      break;
    case "sepultura":
      const fallecidosSep = await Fallecido.findAll({
        limit: 10,
        where: {
          sepult: {
            [Op.like]: "%" + busqueda + "%",
          },
        },
      });
      res.json(fallecidosSep);

      break;

    default:
      res.status(400).json({
        msg: `Hable con el Administrador`,
      });
  }
};

export const obtenerFuturos = async (req: Request, res: Response) => {
  const futuros = await Futuros.findAll();
  res.json(futuros);
  console.log(futuros);
};

export const getFallecido = async (req: Request, res: Response) => {
  const { id } = req.params;
  const fallecidos = await Fallecido.findByPk(id);
  res.json(fallecidos);
};

export const crearFallecidoCloudinary = async (req: Request, res: Response) => {
  const body = req.body;
  const tipo = "fallecidos";
  // Procesar la carga de la imagen
  const file: any = req.files?.file;

  const validando = validarExtensionCorte(file);
  if (!validando) {
    console.log("llego hasta aqui");
    res.status(404).json({
      ok: false,
      msg: "La extension no es válida",
    });
  } else {
    try {
      //Cloudinary comprobar path y nombre
      const tempFilePath: any = req.files?.file;
      console.log(tempFilePath.tempFilePath);
      const { secure_url } = await cloudinary.uploader.upload(
        tempFilePath.tempFilePath
      );
      body.url = secure_url;

      const fallecido = Fallecido.build(body);
      await fallecido.save();
      console.log("Fallecido creado en base de datos y archivo en Cloudinary");
      res.json(fallecido);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: `Hable con el Administrador`,
      });
    }
  }
};

export const crearFuturos = async (req: Request, res: Response) => {
  const { body } = req;
  console.log(body);

  try {
    const futuros = Futuros.build(body);
    await futuros.save();
    console.log("Fallecido creado en base de datos");
    res.json(futuros);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Hable con el Administrador`,
    });
  }
};

export const actualizarFallecidoCloudinary = async (
  req: Request,
  res: Response
) => {
  const body = req.body;
  const tipo = req.params.tipo;
  const id = req.params.id;

  // Procesar la carga de la imagen
  const file: any = req.files?.file;
  console.log(file);

  const validando = validarExtensionCorte(file);
  if (!validando) {
    console.log("llego hasta aqui");
    res.status(404).json({
      ok: true,
      msg: "La extension no es válida",
    });
  } else {
    //Cloudinary comprobar path y nombre
    const tempFilePath: any = req.files?.file;
    const { secure_url } = await cloudinary.uploader.upload(
      tempFilePath.tempFilePath
    );
    const nombreArchivo = secure_url;

    actualizarImagenCloudinary(id, tipo, nombreArchivo, body);

    res.json("por fi");
  }
};

export const borrarFuturos = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const futuros = await Futuros.findByPk(id);
    if (!futuros) {
      return res.status(404).json({
        ok: false,
        msg: "No existe fallecido con el ID: " + id,
      });
    }

    await futuros.destroy();
    res.json(futuros);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Hable con el Administrador`,
    });
  }
};

export const actualizarFuturos = async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  const { id } = req.params;

  try {
    const futuros = await Futuros.findByPk(id);
    if (!futuros) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun fallecido con el id " + id,
      });
    }

    await futuros.update(body);
    res.json(futuros);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Hable con el Administrador`,
    });
  }
};

export const deleteFallecido = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const fallecido = await Fallecido.findByPk(id);
    if (!fallecido) {
      return res.status(404).json({
        ok: false,
        msg: "No existe usuario con el ID: " + id,
      });
    }

    await fallecido.destroy();
    res.json(fallecido);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Hable con el Administrador`,
    });
  }
};
