/* import { Request, Response } from "express";

export const validarArchivoExiste = (req:Request, res: Response, next:any) => {
 
  const file: any = req.files?.file;
  console.log("Este es en en reqFiles del controlador: " + req.files);
  console.log(file)
  Validamos que exista un archivo en envio
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
        ok: false,
        msg: 'No files were uploaded.'
    });
}
console.log("El archivo existe")
 next();
}  */


 import { Request, Response, NextFunction } from "express";

export const validarArchivoExiste = (req: Request, res: Response, next: NextFunction) => {
    // Validamos que exista un archivo en envío
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            ok: false,
            msg: 'No se subió ningún archivo o el campo se llama diferente a "file"'
        });
    }

    // Mejor forma de loguear los archivos
    console.log("Archivos recibidos:", Object.keys(req.files));
    console.log("Archivo principal:", req.files.file);

    next();
}