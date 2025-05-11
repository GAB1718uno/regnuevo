"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const perfiles_1 = require("../controllers/perfiles");
const usuarios_1 = require("../controllers/usuarios");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.get('/renuevo', [validarJWT_1.validarJWT], usuarios_1.revalidarToken);
router.get('/', perfiles_1.obtenerPerfiles);
/* router.post('/nuevo',
[
    check('usuario', 'El nombre del usuario es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
    check('password', 'El password debe contener mayusculas, minusculas, numeros y al menos un caracter especial').isStrongPassword(),
    validarCampos,
    validarEmail,
] , crearUsuario); */
router.post('/nuevo', [
/* check('usuario', 'El nombre del usuario es obligatorio').not().isEmpty(),
check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
check('password', 'El password debe contener mayusculas, minusculas, numeros y al menos un caracter especial').isStrongPassword(),
validarCampos,
validarEmail, */
], perfiles_1.crearPerfilCloudinary);
router.get('/:id', perfiles_1.obtenerPerfilPorId);
router.put('/:id', [
/* check('usuario', 'El nombre del usuario es obligatorio').not().isEmpty(),
check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
check('password', 'El password debe contener mayusculas, minusculas, numeros y al menos un caracter especial').isStrongPassword(),
validarCampos,
validarEmail */
], perfiles_1.actualizarPerfilCloudinary); //actualizarPerfilUsuario
router.post('/', usuarios_1.comprobarLogin); //[ validarJwt ]
router.delete('/:id', usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=perfiles.js.map