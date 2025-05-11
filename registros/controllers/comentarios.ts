import { Request, Response } from 'express';
import Comentario from '../models/comentario';

export const crearComentarios = async (req:Request, res:Response) => {
    const body = req.body;

    const comentarios = Comentario.build(body);
    await comentarios.save();
}

export const obtenerComentarioIndividual = async (req:Request, res:Response) => {

    const {fallecidoId} = req.params

   console.log(fallecidoId)

    const comentarios = await Comentario.findAll( {where: {fallecidoId:fallecidoId}} );

    try {
       res.json(comentarios) 


} catch (error) {
    console.log(error)
    res.status(500).json({
        msg: `Hable con el Administrador`
    })
     }
 }

export const obtenerComentarios = async (req:Request, res:Response) => {
    const { fallecidoId } = req.body;
    console.log(fallecidoId)

    const comentarios = await Comentario.findAll( 
    
)
res.json(comentarios)

}

export const deleteComentario = async (req:Request, res:Response) => {
    const {id} = req.params

    const comentario = await Comentario.findByPk(id)

    try { 
        
        comentario?.destroy()
        res.json(comentario) 
 
 
 } catch (error) {
     console.log(error)
     res.status(500).json({
         msg: `Hable con el Administrador`
     })
      }
   
}

export const borrarTodosComentarios = async (req:Request, res:Response) => {
    const fallecidoId = req.params.fallecidoId;

    const comentarios = await Comentario.findOne( 
        {
            where: { fallecidoId:fallecidoId },
        }
)

await comentarios?.destroy()
return res.json(comentarios)
}