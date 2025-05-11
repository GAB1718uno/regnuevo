import { Router } from 'express';
import { actualizarFile, borramosDatosFile, crearFile, mostrarDatosFile, mostrarFile, actualizarFileCloudinary, crearFileCloudinary } from '../controllers/uploads';
import { validarArchivoExiste } from '../middlewares/validarArchivoExiste';
import { validarJWT } from '../middlewares/validarJWT';
import { check } from 'express-validator';
import { tiposPermitidos } from '../helpers/tiposPermitidos';
import { validarCampos } from '../middlewares/validarCampos';

const router = Router();
router.get('/:tipo/:archivo', mostrarFile ) //[ validarJwt ],

//router.put('/:tipo/:id', [ validarJwt ], actualizarFile )

router.put('/:tipo/:id', [ 
    validarJWT,
    validarArchivoExiste, 
    check('tipo').custom(t => tiposPermitidos(t, ['usuarios', 'fallecidos', 'Sepulturas','sepulturas'])),
    validarCampos 
], actualizarFileCloudinary )

router.delete('/:tipo/:id', [ validarJWT ], borramosDatosFile )

router.get('/:tipo/', mostrarDatosFile ) //[ validarJwt ],


//router.post('/:tipo/', crearFile ) //[ validarJwt ],

router.post('/:tipo/',
[
    validarJWT,
    validarArchivoExiste, 
    check('tipo').custom(t => tiposPermitidos(t, ['usuarios', 'fallecidos', 'Sepulturas','sepulturas'])),
    validarCampos 
], crearFileCloudinary ) 

export default router;