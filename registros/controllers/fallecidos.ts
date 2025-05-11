import { Request, Response } from "express";
import { Op, where } from "sequelize";
import { validarExtensionCorte } from "../helpers/validarExtensionCorte";
import Fallecido from "../models/fallecido";
import { v2 as cloudinary } from "cloudinary";
import actualizarImagenCloudinary from "../helpers/actualizar-imagen-cloudinary";



export const obtenerFallecidosPorSepulturaReserva = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  console.log(JSON.stringify(req.params))

  try {
    const fallecidos = await Fallecido.findAll({
      where: { sepulturaId: Number(id) }, // Asegurar que es número
      /* attributes: ['id', 'nombre', 'apellidos', 'fechaFallecimiento', 'avatar'], */
      order: [
        ['name', 'DESC'] // Formato correcto para order
      ],
    });

    console.log(fallecidos)
    return res.json({
      success: true,
      data: fallecidos,
      count: fallecidos.length
    
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener fallecidos'
    });
  }
};


export const obtenerFallecidosPorSepultura = async (req: Request, res: Response) => {
  const calle = decodeURIComponent(req.params.calle);
  const numero = decodeURIComponent(req.params.numero);
  console.log(calle, numero)

  const sepult = calle + ", " + numero;

  try {
    const fallecidos = await Fallecido.findAll({
      where: { sepult: sepult},
      order: [['name', 'DESC']],
    });

    // Enviar directamente el array sin envolverlo en otro objeto
    return res.json(fallecidos);

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error al obtener fallecidos' });
  }
};



export const obtenerRelacionado = async (req: Request, res: Response) => {
  const { sepult } = req.params;
  const { sepulturaId } = req.params;

  console.log("LA SEPULTURA ES LA DE LA CALLE: " + sepult);

  const muerto = await Fallecido.findAll({
    where: {
      //sepulturaId:sepulturaId
      sepult: sepult,
    },
  });

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


export const getFallecidosCribaNyA = async (req: Request, res: Response) => {
  // Supongamos que recibes los parámetros como params query strings
  // Ejemplo: /api/fallecidos?nombre=Geronimo&apellido=alc
  const nombreRecogido = decodeURIComponent(req.params.nombre);
  const apellidos = decodeURIComponent(req.params.apellidos);
  console.log(nombreRecogido, apellidos)

  // Se arma la cláusula where en base a los parámetros recibidos
  let whereClause = {};

  if (nombreRecogido !== "todos" && apellidos !== "todos") {
    console.log("Estamos en la "+nombreRecogido,apellidos)
    // Si se pasan ambos, se filtra en ambos campos
    whereClause = {
      name: { [Op.like]: "%" + nombreRecogido + "%" },
      apellidos: { [Op.like]: "%" + apellidos + "%" },
    };
  } else if (nombreRecogido !== "todos") {
    // Si solo se pasa nombre, se filtra solo en nombres
    
    console.log(nombreRecogido)
    whereClause = {
      name: { [Op.like]: "%" + nombreRecogido + "%" },
      
    };
  } else if (apellidos !== "todos") {
    // Si solo se pasa apellido, se filtra solo en apellidos
    whereClause = {
      apellidos: { [Op.like]: "%" + apellidos + "%" },
    };
  }

  const fallecidos = await Fallecido.findAll({
    limit: 10,
       where: whereClause,
  });

  res.json(fallecidos);
};





















export const getFallecidosCriba = async (req: Request, res: Response) => {
  const tipo = req.params.tipo;
  const busqueda = req.params.termino;
  console.log(tipo, busqueda)

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

export const getFallecidos = async (req: Request, res: Response) => {
console.log("Paramnetros recibidos: "+ JSON.stringify(req.params, null, 2))

  console.log("El valor de pageSize es actualmente: " + req.params.pageSize);

  let pageSize = parseInt(req.params.pageSize) || 20;

  console.log("El valor de pageSize es ahora: " + pageSize);

  let page = parseInt(req.params.page) || 1;

  if (isNaN(pageSize) || pageSize <= 0) {
    return res
      .status(400)
      .json({
        error:
          'El parámetro "pageSize" debe ser un número entero mayor que cero',
      });
  }

  if (isNaN(page) || page <= 0) {
    page = 1;
  }

  const offset = (page - 1) * pageSize;
  console.log(page);

  const fallecidos = await Fallecido.findAndCountAll({
    order: [["fallecio", "DESC"]],
    limit: pageSize,
    offset,
  });

  res.json(fallecidos);
};

//Obtener fallecidos por limite
/* export const getFallecidos = async (req: Request, res: Response) => {
    const limit = parseInt(req.params.limit);
    const offset = parseInt(req.params.offset);

    
    const fallecidos = await Fallecido.findAll({
        order: [['fallecio', 'DESC']],
        limit,
        offset
    });

    res.json(fallecidos)

} */

// Obtener fallecidos de forma normal
export const getFallecidosTodos = async (req: Request, res: Response) => {
  const fallecidos = await Fallecido.findAll();
  res.json(fallecidos);
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
  console.log("Archivos recibidos:", JSON.stringify(req.files, null, 2));


  const validando = validarExtensionCorte(file);
  if (!validando) {
    console.log("llego hasta aqui");
    res.status(404).json({
      ok: false,
      msg: "La extension no es válida",
    });
  } else {
    try {
      console.log("Aqui estamos para ver que pasa: "+ validando);
      
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

export const postFallecidos = async (req: Request, res: Response) => {
  const { body } = req;
  console.log(body);

  try {
    const fallecidos = Fallecido.build(body);
    await fallecidos.save();
    console.log("Fallecido creado en base de datos");
    res.json(fallecidos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Hable con el Administrador`,
    });
  }
};

export const actulizarFallecidoFavorito = async ( req: Request, res: Response) => {
  const body = req.body;
  const id = req.params.id;

  try {
    const fallecido = await Fallecido.findByPk(id);
    if (!fallecido) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun fallecido con el id " + id,
      });
    }

    await fallecido.update(body);
    res.json(fallecido);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Hable con el Administrador`,
    });
  }

}





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

export const putFallecido = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const fallecido = await Fallecido.findByPk(id);
    if (!fallecido) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun fallecido con el id " + id,
      });
    }

    await fallecido.update(body);
    res.json(fallecido);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Hable con el Administrador`,
    });
  }
};

export const putFallecidoFavorito = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const fallecido = await Fallecido.findByPk(id);
    if (!fallecido) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ningun fallecido con el id " + id,
      });
    }

    await fallecido.update(body);
    res.json(fallecido);
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
