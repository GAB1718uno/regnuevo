"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploads_1 = require("../controllers/uploads");
const validarArchivoExiste_1 = require("../middlewares/validarArchivoExiste");
const validarJWT_1 = require("../middlewares/validarJWT");
const express_validator_1 = require("express-validator");
const tiposPermitidos_1 = require("../helpers/tiposPermitidos");
const validarCampos_1 = require("../middlewares/validarCampos");
const router = (0, express_1.Router)();
router.get('/:tipo/:archivo', uploads_1.mostrarFile); //[ validarJwt ],
//router.put('/:tipo/:id', [ validarJwt ], actualizarFile )
router.put('/:tipo/:id', [
    validarJWT_1.validarJWT,
    validarArchivoExiste_1.validarArchivoExiste,
    (0, express_validator_1.check)('tipo').custom(t => (0, tiposPermitidos_1.tiposPermitidos)(t, ['usuarios', 'fallecidos', 'Sepulturas', 'sepulturas'])),
    validarCampos_1.validarCampos
], uploads_1.actualizarFileCloudinary);
router.delete('/:tipo/:id', [validarJWT_1.validarJWT], uploads_1.borramosDatosFile);
router.get('/:tipo/', uploads_1.mostrarDatosFile); //[ validarJwt ],
//router.post('/:tipo/', crearFile ) //[ validarJwt ],
router.post('/:tipo/', [
    validarJWT_1.validarJWT,
    validarArchivoExiste_1.validarArchivoExiste,
    (0, express_validator_1.check)('tipo').custom(t => (0, tiposPermitidos_1.tiposPermitidos)(t, ['usuarios', 'fallecidos', 'Sepulturas', 'sepulturas'])),
    validarCampos_1.validarCampos
], uploads_1.crearFileCloudinary);
exports.default = router;
//# sourceMappingURL=uploads.js.map