import { Request, Response } from "express";
import { Op } from "sequelize";
import { validarExtensionCorte } from "../helpers/validarExtensionCorte";
import Fallecido from "../models/fallecido";
import { v2 as cloudinary } from 'cloudinary'
import actualizarImagenCloudinary from "../helpers/actualizar-imagen-cloudinary";
import Historia from "../models/historia";

export const obtenerRelacionado = async (req:Request, res:Response) => {

     const {sepult} = req.params
 
    console.log(sepult)
 
     const muerto = await Fallecido.findAll( {where: {sepult:sepult}} );
 
     try {
     if (!sepult){
        res.json(muerto) 
 }
return res.json(muerto) 

} catch (error) {
     console.log(error)
     res.status(500).json({
         msg: `Hable con el Administrador`
     })
      }
  }
 
 export const getHistoriaPorFallecido = async (req: Request, res: Response) => {
    
    const fallecidoId = req.params.fallecidoId;
    console.log('Este es el valor del fallecidoId: '+ fallecidoId)

        try {
            const historias = await Historia.findAll(
            {   limit:10,
                where: { fallecidoId: fallecidoId } 
            }
            )
            

            res.json(historias)
            }
            catch (error) {
                console.log(error)
                res.status(500).json({
                    msg: `Hable con el Administrador`
                })
        
            }
 
}

export const getFallecidos = async (req: Request, res: Response) => {

    
    const fallecidos = await Fallecido.findAll();
    res.json(fallecidos)

}

export const getFallecido = async (req: Request, res: Response) => {

    const { id } = req.params
    const fallecidos = await Fallecido.findByPk(id);
    res.json(fallecidos)

}

export const crearHistoriaCloudinary = async (req: Request, res: Response) => {

    const body = req.body
    
    //const tipo = 'fallecidos'    
    // Procesar la carga de la imagen
    const file: any = req.files?.file;

    const validando = validarExtensionCorte(file)
    if (!validando){
        console.log('llego hasta aqui')
        res.status(404).json({
            ok:false,
            msg: 'La extension no es válida'
        })
    } else {

        try {
            
            //Cloudinary comprobar path y nombre
            const tempFilePath:any = req.files?.file;
            console.log(tempFilePath.tempFilePath)
            const {secure_url} = await cloudinary.uploader.upload(tempFilePath.tempFilePath)
            body.img = secure_url
            
            const historia = Historia.build(body)
        await historia.save();
        console.log('Historia creada en base de datos y archivo en Cloudinary')
        res.json(historia)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`
        })

    }
}



}

export const postFallecidos = async (req: Request, res: Response) => {

    const {body} = req
    console.log(body)

    try {
        const fallecidos = Fallecido.build(body)
        await fallecidos.save();
        console.log('Fallecido creado en base de datos')
        res.json(fallecidos)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`
        })

    }
}


export const actualizarFallecidoCloudinary = async (req: Request, res: Response) => {
    const body = req.body
    const tipo = req.params.tipo;
    const id = req.params.id;

    // Procesar la carga de la imagen
    const file: any = req.files?.file;
    console.log(file);
    

    const validando = validarExtensionCorte(file)
    if (!validando){
        console.log('llego hasta aqui')
        res.status(404).json({
            ok:true,
            msg: 'La extension no es válida'
        })
    } else {

    //Cloudinary comprobar path y nombre
    const tempFilePath:any = req.files?.file;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath.tempFilePath)
    const nombreArchivo = secure_url
    
    actualizarImagenCloudinary(id, tipo, nombreArchivo, body)
    
    res.json('por fi')

}
}

export const putFallecido = async (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params

    try {
        const fallecido = await Fallecido.findByPk(id);
        if (!fallecido) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun fallecido con el id ' + id
            })
        }

        await fallecido.update(body)
        res.json(fallecido)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
}

export const deleteFallecido = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        const fallecido = await Fallecido.findByPk(id);
        if (!fallecido) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con el ID: ' + id
            })
        }

        await fallecido.destroy();
       res.json(fallecido)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
}