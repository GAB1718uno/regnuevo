import { Request, Response } from 'express';
import Usuario from '../models/usuario';
import * as bcrypt from 'bcrypt'
import generarJwt from '../helpers/jwt';
import { v2 as cloudinary } from 'cloudinary'
import { validarExtensionCorte } from '../helpers/validarExtensionCorte';
import Perfil from '../models/perfiles';

export const obtenerPerfiles = async (req: Request, res: Response) => {

const perfiles = await Perfil.findAll();

    res.json(perfiles)

}

export const obtenerPerfilPorId = async (req: Request, res: Response) => {

    const { id } = req.params;

    const perfil = await Perfil.findByPk( id );

     try {
    if(perfil) {
       

            res.json(perfil)
            /* res.status(200).json({ 
                ok:true,
                usuario
                }) */
            
        
        
    } else {
        res.status(404).json({
            msg: `No existe perfil para el usuario con este ID`
        })
    }
} catch (error) {
        
            res.status(500).json({
                msg: `Hable con administrador`
            })
        }

}

export const crearPerfil = async (req: Request, res: Response) => {
    
    console.log(req.body);
    
    try {    
    const { body } = req;
    //const salt = bcrypt.genSaltSync(10);
    //req.body.password = bcrypt.hashSync(req.body.password, salt)
    
    const perfil = await Perfil.create(body)
    /* const usuario = Usuario.build( req.body )
    
    await usuario.save(); */
    
    console.log(perfil.id)
     //Generando Token/* 
    //const token = await generarJwt(usuario.id, usuario.usuario, usuario.email, usuario.avatar);
    //console.log(token)

    res.status(201).json({
        ok:true,
        msg:"Perfil creado con éxito",
        uid: perfil.id,
        email:perfil.identidad
    })
              

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`,
            ok:false,
            error
        })
        
    }
    
    

}

export const actualizarPerfilCloudinary = async (req: Request, res: Response) => {

    console.log(req.body);
    const file = req.files?.file

    const validarExtension = validarExtensionCorte(file)
    if (!validarExtension) {
        res.status(404).json({
            ok:false,
            msg:'La extension del archivo no es válida'
        })
    } else {
    try {    
    const { body } = req;
    const { id } = req.params;
    
    //Cloudinary comprobar path y nombre
    const tempFilePath:any = req.files?.file;
    console.log(tempFilePath.tempFilePath)
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath.tempFilePath)
    body.avatar = secure_url

    const perfilUsuario = await Perfil.findByPk( id );
        if(!perfilUsuario){
            return res.status(404).json({
                ok: false,
                msg: 'No existe perfil del usuario'
            })
        }

        await perfilUsuario.update( body );
    

    res.status(201).json({
        ok:true,
        msg:"Perfil actualizado con éxito",
        uid: perfilUsuario.id,
        usuario:perfilUsuario.nombreUsuario,
        nombre:perfilUsuario.nombre,
        avatar: perfilUsuario.avatar

    })
              

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`,
            ok:false,
            error
        })
        
    }
}
    

}

export const crearPerfilCloudinary = async (req: Request, res: Response) => {
    
    const { body } = req;
    console.log(req.body);
    const file = req.files?.file
    
    if (!file) {
        body.avatar = 'https://res.cloudinary.com/ddxm1pvmd/image/upload/v1669648194/nlnoip90imlo1gu7aezm.png';
    } else {

    const validarExtension = validarExtensionCorte(file)
    if (!validarExtension) {
        res.status(404).json({
            ok:false,
            msg:'La extension del archivo no es válida'
        })
    } else {
        //Cloudinary comprobar path y nombre
    const tempFilePath:any = req.files?.file;
    console.log(tempFilePath.tempFilePath)
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath.tempFilePath)
    body.avatar = secure_url
    } 

    try {  
    const perfil = await Perfil.create(body)
    
    console.log(perfil.id)
     //Generando Token/* 
    res.status(201).json({
        ok:true,
        msg:"Perfil creado con éxito",
        perfil
    })
              

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`,
            ok:false,
            error
        })
        
    }
}
    

}

export const actualizarPerfilUsuario = async (req: Request, res: Response) => {

    const { body } = req;
    console.log(body);
    
    const { id } = req.params;

    try {

        const perfilUsuario = await Perfil.findByPk( id );
        if(!perfilUsuario){
            return res.status(404).json({
                ok: false,
                msg: 'No existe perfil del usuario'
            })
        }

        await perfilUsuario.update( body );
        res.json(perfilUsuario)
    

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`
        })
        
    }

}

export const deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

try {

    const usuario = await Usuario.findByPk( id );

    if (!usuario){
        return res.status(404).json({
            ok:false,
            msg: 'No existe usuario con el ID: ' + id
        })
    }

    /* await usuario.update( { estado: false }) */

    await usuario.destroy();

    res.json(usuario)
    
} catch (error) 
{
    console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`
    
});
}
}

