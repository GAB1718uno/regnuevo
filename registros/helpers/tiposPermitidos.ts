export const tiposPermitidos = ( tipo:any='', tipos:any=[] )=>{

    const incluida = tipos.includes(tipo)
    
    if (!incluida){
        throw new Error(`El tipo no es permitido. No corresponde a, ${ tipos }`);
    }

    return true;
}