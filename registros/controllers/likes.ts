import { Request, Response } from 'express';
import Likes from '../models/likes';

export const crearLikes = async (req:Request, res:Response) => {
    const body = req.body;

    try {
        const likes = Likes.build(body);
    await likes.save();
           res.json(likes) 
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`
        })
         }


   
}

export const obtenerLikeIndividual = async (req:Request, res:Response) => {

    const {fallecidoId} = req.params

   console.log(fallecidoId)

    const likes = await Likes.findAll( {where: {fallecidoId:fallecidoId}} );

    try {
    if (!fallecidoId){
       res.json(likes) 
}
return res.json(likes) 

} catch (error) {
    console.log(error)
    res.status(500).json({
        msg: `Hable con el Administrador`
    })
     }
 }

export const obtenerLikes = async (req:Request, res:Response) => {
    const { fallecidoId } = req.body;
    console.log(fallecidoId)

    const likes = await Likes.findAll( 
        /* {
            where: {fallecidoId : fallecidoId},
        } */
)
res.json(likes)

}

export const borrarLikes = async (req:Request, res:Response) => {
    const fallecidoId = req.params.fallecidoId;
    const usuarioId = req.params.usuarioId;
    console.log(usuarioId)

    const likes = await Likes.findOne( 
        {
            where: {usuarioId : usuarioId, fallecidoId:fallecidoId},
        }
)

await likes?.destroy()
res.json(likes)
}