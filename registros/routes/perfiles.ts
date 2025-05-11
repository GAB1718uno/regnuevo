import { Router } from "express";
import { check } from "express-validator";
import { actualizarPerfilCloudinary, crearPerfilCloudinary, obtenerPerfiles, obtenerPerfilPorId } from '../controllers/perfiles';
import { deleteUsuario, comprobarLogin, revalidarToken, crearUsuario, obtenerUsuarios, obtenerUsuario, actualizarUsuario, crearUsuarioCloudinary } from '../controllers/usuarios';
import { validarCampos } from '../middlewares/validarCampos';
import { validarEmail } from '../middlewares/validarEmail';
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.get('/renuevo' , [ validarJWT ], revalidarToken);
router.get('/', obtenerPerfiles);


/* router.post('/nuevo',
[
    check('usuario', 'El nombre del usuario es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
    check('password', 'El password debe contener mayusculas, minusculas, numeros y al menos un caracter especial').isStrongPassword(),
    validarCampos,
    validarEmail,
] , crearUsuario); */

router.post('/nuevo',
[
    /* check('usuario', 'El nombre del usuario es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
    check('password', 'El password debe contener mayusculas, minusculas, numeros y al menos un caracter especial').isStrongPassword(),
    validarCampos,
    validarEmail, */
] , crearPerfilCloudinary);




router.get('/:id', obtenerPerfilPorId);

router.put('/:id',
[
    /* check('usuario', 'El nombre del usuario es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
    check('password', 'El password debe contener mayusculas, minusculas, numeros y al menos un caracter especial').isStrongPassword(),
    validarCampos,
    validarEmail */
] ,  actualizarPerfilCloudinary); //actualizarPerfilUsuario

router.post('/', comprobarLogin); //[ validarJwt ]

router.delete('/:id', deleteUsuario);

export default router;

