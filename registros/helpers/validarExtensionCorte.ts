import { request, response } from "express";

export const validarExtensionCorte = (file:any) => {

   console.log (file + " dentro del validarCorte")
   
    //Cortamos el nombre del archivo y separamos extension
    const fileCortado = file.name.split('.');
    const extensionArchivo = fileCortado[fileCortado.length - 1]
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'svg', 'gif']

    if (!extensionesValidas.includes(extensionArchivo)) {

       return false;
          } else {
          return true;
        }
}