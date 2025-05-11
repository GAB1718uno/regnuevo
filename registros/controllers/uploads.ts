import { Request, Response } from "express";
import { v4 } from "uuid";
import actualizarImagen from "../helpers/actualizar-imagen";
import actualizarImagenCloudinary from "../helpers/actualizar-imagen-cloudinary";
import fs from "fs";
import * as path from 'path';
import Uploads from "../models/uploads";
import { v2 as cloudinary } from 'cloudinary'
import { validarExtensionCorte } from "../helpers/validarExtensionCorte";
import Sepultura from '../models/sepultura';
  
/* cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
  }); */
  cloudinary.config({ 
    cloud_name: 'ddxm1pvmd', 
    api_key: '934857619637733', 
    api_secret: 'XXiAdEkOs6933Qgm-whY52pwNyc' 
  });
//cloudinary.config(process.env.CLOUDINARY_URL!)



export const crearFile = async (req: Request, res: Response) => {

    const body = req.body
    const tipo = req.params.tipo.toLowerCase();
    const id = req.params.id;

    const tiposValidos = ['usuarios', 'fallecidos', 'sepulturas'];

    //Validamos que el tipo sea correcto
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: ' El tipo de archivo no es correcto'
        })
    }

    //Validamos que exista un archivo en envio
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }

    //Procesar archivo
    const file: any = req.files.file;
    console.log(file)
    const fileCortado = file.name.split('.');
    const extensionArchivo = fileCortado[fileCortado.length - 1]
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'svg', 'gif']

    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extension de archivo no permitida'
        });
    }

    //Generar nombre del archivo
    const nombreArchivo = `${v4()}.${extensionArchivo}`;

    console.log(file)
    console.log(nombreArchivo)

    //path de archivo
    const elpath = path.join(__dirname, `../../uploads/${tipo}/${nombreArchivo}`);
    //const path = `http://167.71.36.17:3000/uploads/${tipo}/${nombreArchivo}`;
    console.log(elpath)


    //Mover
    // Use the mv() method to place the file somewhere on your server
    file.mv(elpath, (err: any) => {
        if (err) {
            return res.status(500).json(
                {
                    ok: false,
                    err
                })
        }

        /* res.status(200).json(
            {
                ok: true,
                id,
                nombreArchivo
            }); */
    });


    body.tipo = tipo;
    body.avatar = nombreArchivo;

    switch (tipo) {
        case 'usuarios':
            const usuario = Uploads.build(body);
            await usuario.save();
            console.log(usuario)
            break;

        case 'fallecidos':
            const fallecido = Uploads.build(body);
            await fallecido.save()
            res.status(200).json({
                ok: true,
                msg: 'Creado con exito',
                body

            })
            return true;
            break;
            
            case 'sepulturas':
                const sepultura = Uploads.build(body);
                await sepultura.save()
                res.status(200).json({
                    ok: true,
                    msg: 'Creado con exito',
                    body
    
                })
            console.log(sepultura)
            //return true;
            break;

        default:
            break;
    }
}

export const crearFileCloudinary = async (req: Request, res: Response) => {

    const body = req.body
    const tipo = req.params.tipo;
    
    // Procesar la carga de la imagen
    const file: any = req.files?.file;

    const validando = validarExtensionCorte(file)
    if (!validando){
        console.log('llego hasta aqui')
        res.status(404).json({
            ok:true,
            msg: 'La extension no es válida'
        })
    } else {

        //actualizarImagenCloudinary(id, tipo, nombreArchivo, body)
        
        
        try {
            
            //Cloudinary comprobar path y nombre
            const tempFilePath:any = req.files?.file;
            console.log(tempFilePath.tempFilePath)
            const {secure_url} = await cloudinary.uploader.upload(tempFilePath.tempFilePath)
            body.avatar = secure_url
            
            const sepultura = Sepultura.build(body)
        await sepultura.save();
        console.log('Sepultura creada en base de datos y archivo en Cloudinary')
        res.json(sepultura)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`
        })

    }
}



}

export const actualizarFile = (req: Request, res: Response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['usuarios', 'fallecidos', 'sepulturas'];

    //Validamos que el tipo sea correcto
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: ' El tipo de archivo no es correcto'
        })
    }

    //Validamos que exista un archivo en envio
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }


    // Procesar la carga de la imagen
    const file: any = req.files.imagen;

    const fileCortado = file.name.split('.');
    const extensionArchivo = fileCortado[fileCortado.length - 1]
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'svg', 'gif']

    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extension de archivo no permitida'
        });
    }

    //Generar nombre del archivo
    const nombreArchivo = `${v4()}.${extensionArchivo}`;

    console.log(file)
    console.log(nombreArchivo)

    //path de archivo
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err: any) => {
        if (err) {
            return res.status(500).json(
                {
                    ok: false,
                    err
                })
        }

        /* res.status(200).json(
            {
                ok: true,
                id,
                nombreArchivo
            }); */
    });

    actualizarImagen(id, tipo, nombreArchivo)

}

export const actualizarFileCloudinary = async (req: Request, res: Response) => {
    const body = req.body
    const tipo = req.params.tipo;
    const id = req.params.id;

    // Procesar la carga de la imagen
    const file: any = req.files?.file;

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
    console.log(tempFilePath.tempFilePath)
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath.tempFilePath)
    const nombreArchivo = secure_url
    console.log(nombreArchivo)
    
    actualizarImagenCloudinary(id, tipo, nombreArchivo, body)
    
    res.json('por fi')

}
}


export const borramosDatosFile = async (req: Request, res: Response) => {

    const id = req.params.id;
    const tipo = req.params.tipo;

    const fallecidoFiles = await Uploads.findByPk(id);
    if (!fallecidoFiles) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe usuario con el ID: ' + id
        })
    }

    await fallecidoFiles.destroy();
    return res.json(fallecidoFiles)

}


export const mostrarDatosFile = async (req: Request, res: Response) => {

    const fallecidosUploads = await Uploads.findAll();
    return res.json(fallecidosUploads)

}



export const mostrarFile = (req: Request, res: Response) => {

    const archivo = req.params.archivo;
    const tipo = req.params.tipo.toLowerCase();

    const pathFile = path.join(__dirname, `../uploads/${tipo}/${archivo}`);

    const pathFileCortado = pathFile.replace('dist', '')


    if (fs.existsSync(pathFileCortado)) {
        return res.sendFile(pathFileCortado);
    } else {
        const pathFile = path.join(__dirname, `../uploads/no-image.png`);
        const pathFileCortado = pathFile.replace('dist', '')
        return res.sendFile(pathFileCortado);
    }


}