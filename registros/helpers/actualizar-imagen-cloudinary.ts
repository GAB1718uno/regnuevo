import fs from "fs"
import Uploads from '../models/uploads';
import Sepultura from '../models/sepultura';
import { v2 as cloudinary } from 'cloudinary'
import { body } from 'express-validator';
import Fallecido from '../models/fallecido';
import Usuario from '../models/usuario';
const actualizarImagen = async (id:any, tipo:any, nombreArchivo:any, body:any) => {


console.log('Va todo bien')
    
    switch ( tipo ) {
        case 'usuarios':
            const usuario:any = await Usuario.findByPk(id);
                if (usuario.avatar) {
                    console.log(usuario.avatar);
                    
                    //Creamos una constante con el valor del campo
                    const urlEnBD = usuario.avatar;
                    //Creamos un array a partir de la url, sabiendo que en el ultimo peldaño estará el nombre del archivo
                    //https://res.cloudinary.com/ddxm1pvmd/image/upload/v1664959310/ymxhbyyzi8nvq1klvtwf.png
                    const arrayDeUrl = urlEnBD.split('/');
                    console.log(arrayDeUrl);
                    
                    //Creamos una constante con el nombre del archivo, el ultimo elemento del array
                    const urlCortada = arrayDeUrl[arrayDeUrl.length -1]
                    console.log(urlCortada);
                    
                    //Extraimos el [public_id] como está establecido en cloudinary, que viene a ser el nombre del archivo sin la extensión
                    const [public_id] = urlCortada.split('.')

                    //Destruimos el archivo fisico almacenado en cloudinary
                    await cloudinary.uploader.destroy(public_id)
                }

                usuario.avatar = nombreArchivo
                body.url = usuario.avatar
                await usuario.update(body)
                return true;
                break;
            
            case 'fallecidos':
                const fallecido:any = await Fallecido.findByPk(id);
                if (fallecido.url) {
                    console.log(fallecido.url);
                    
                    //Creamos una constante con el valor del campo
                    const urlEnBD = fallecido.url;
                    //Creamos un array a partir de la url, sabiendo que en el ultimo peldaño estará el nombre del archivo
                    //https://res.cloudinary.com/ddxm1pvmd/image/upload/v1664959310/ymxhbyyzi8nvq1klvtwf.png
                    const arrayDeUrl = urlEnBD.split('/');
                    console.log(arrayDeUrl);
                    
                    //Creamos una constante con el nombre del archivo, el ultimo elemento del array
                    const urlCortada = arrayDeUrl[arrayDeUrl.length -1]
                    console.log(urlCortada);
                    
                    //Extraimos el [public_id] como está establecido en cloudinary, que viene a ser el nombre del archivo sin la extensión
                    const [public_id] = urlCortada.split('.')

                    //Destruimos el archivo fisico almacenado en cloudinary
                    await cloudinary.uploader.destroy(public_id)
                }

                fallecido.url = nombreArchivo
                body.url = fallecido.url
                await fallecido.update(body)
                return true;
                break;
                
                case 'sepulturas':
                    const sepultura:any = await Sepultura.findByPk(id);
                    console.log(sepultura)

                    //Borrado en cloudinary
                    console.log(sepultura.avatar)
                    console.log(nombreArchivo)
                    if (sepultura.avatar) {

                        const nombreArchivoBD = sepultura.avatar;

                        // Cloudinary recortar nombre
                    const avatarArray = nombreArchivoBD.split('/')
                    console.log(avatarArray)
                    const avatarCortado = avatarArray[avatarArray.length -1]

                    //Desestructuramos el public_id de Cloudinary y obtenemos el nombre sin extensión
                    const [ public_id ] = avatarCortado.split('.')
                    console.log(public_id);

                        await cloudinary.uploader.destroy(public_id)
                    }

                    sepultura.avatar = nombreArchivo
                    body.avatar = sepultura.avatar
                    await sepultura.update(body)
                    return true;
          break;
        default:
          break;
      }

    }

export default actualizarImagen;