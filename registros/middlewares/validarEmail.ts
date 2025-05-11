import { body } from "express-validator"
import Usuario from "../models/usuario"
import { Request, Response } from 'express';

export const validarEmail = async (req:Request, res: Response, next:any) => {

    const body = req.body

    const existeEmail = await Usuario.findOne({
        where: {
            email: body.email
        }
    })
    
    if (existeEmail) {
        console.log("Ya esxiste un usuario con este Email" + body.email);
        
        return res.status(400).json(
            {
                ok:false,
                msg:'Ya existe un usuario con este email: ' + body.email

            }
        ) }

next()
}