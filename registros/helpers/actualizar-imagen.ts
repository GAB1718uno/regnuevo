import fs from "fs"
import Uploads from '../models/uploads';
const actualizarImagen = async (id:any, tipo:any, nombreArchivo:any) => {


    
    console.log('Va todo bien')
    
    switch ( tipo ) {
        case 'usuarios':
            const usuario = Uploads.findByPk(id);
            console.log(usuario)
            break;
            
            case 'fallecidos':
                const fallecido:any = await Uploads.findByPk(id);
                console.log(fallecido.avatar)

                const pathViejo = `uploads/fallecidos/${ fallecido.avatar }`
                if ( fs.existsSync(pathViejo)){
                    fs.unlinkSync(pathViejo)
                    fallecido.avatar = nombreArchivo
                    
                    await fallecido.save()
                    return true;
                } else {
                    const pathNuevo = `uploads/fallecidos/${ fallecido.avatar }`
                    fallecido.avatar = nombreArchivo
                    
                    await fallecido.save()
                    return true;
                
            }

               
                
                break;
                
                case 'sepulturas':
                    const sepultura = Uploads.findByPk(id);
                    console.log(sepultura)
        
          break;
      
        default:
          break;
      }

}

export default actualizarImagen;