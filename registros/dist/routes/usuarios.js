"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const validarCampos_1 = require("../middlewares/validarCampos");
const validarEmail_1 = require("../middlewares/validarEmail");
const router = (0, express_1.Router)();
router.get('/renuevo' /* , [ validarJWT ] */, usuarios_1.revalidarToken);
router.get('/', usuarios_1.obtenerUsuarios);
/* router.post('/nuevo',
[
    check('usuario', 'El nombre del usuario es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
    check('password', 'El password debe contener mayusculas, minusculas, numeros y al menos un caracter especial').isStrongPassword(),
    validarCampos,
    validarEmail,
] , crearUsuario); */
router.post('/nuevo', [
//check('usuario', 'El nombre del usuario es obligatorio').not().isEmpty(),
//check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
//check('password', 'El password debe contener mayusculas, minusculas, numeros y al menos un caracter especial').isStrongPassword(),
//validarCampos,
//validarEmail,
], usuarios_1.crearUsuarioCloudinary); //crearUsuario); //
router.get('/:id', usuarios_1.obtenerUsuario);
router.put('/password', [], usuarios_1.actualizarPassword);
router.put('/avatar', [], usuarios_1.actualizarAvatar);
router.put('/:id', [
    (0, express_validator_1.check)('usuario', 'El nombre del usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail().not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password debe contener mayusculas, minusculas, numeros y al menos un caracter especial').isStrongPassword(),
    validarCampos_1.validarCampos,
    validarEmail_1.validarEmail
], usuarios_1.actualizarUsuario);
router.post('/', usuarios_1.comprobarLogin); //[ validarJwt ]
router.delete('/:id', usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.js.map