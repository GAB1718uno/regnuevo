"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validarCampos_1 = require("../middlewares/validarCampos");
const fallecidos_1 = require("../controllers/fallecidos");
const validarJWT_1 = require("../middlewares/validarJWT");
const tiposPermitidos_1 = require("../helpers/tiposPermitidos");
const validarArchivoExiste_1 = require("../middlewares/validarArchivoExiste");
const router = (0, express_1.Router)();
//tipo aqui es apellido
router.get("/sepultura/relacionados/:calle/:numero", fallecidos_1.obtenerFallecidosPorSepultura);
router.get("/:pageSize/:page", fallecidos_1.getFallecidos);
router.get("/", fallecidos_1.getFallecidos);
router.get("/busqueda/:nombre/:apellidos", fallecidos_1.getFallecidosCribaNyA);
router.get("/busqueda/:tipo/:termino", fallecidos_1.getFallecidosCriba);
//Con limit y paginanción
router.get("/:id/:sepult/:sepulturaId", fallecidos_1.obtenerRelacionado);
//Original sin limit ni paginación
router.get("/todos", fallecidos_1.getFallecidosTodos);
router.put('/:id/favorito', fallecidos_1.putFallecidoFavorito);
router.get("/:id", fallecidos_1.getFallecido);
router.put("/:tipo/:id", [
    validarJWT_1.validarJWT,
    validarArchivoExiste_1.validarArchivoExiste,
    (0, express_validator_1.check)("tipo").custom((t) => (0, tiposPermitidos_1.tiposPermitidos)(t, ["usuarios", "fallecidos", "Sepulturas", "sepulturas"])),
    validarCampos_1.validarCampos,
], fallecidos_1.actualizarFallecidoCloudinary);
router.post("/", [
    validarJWT_1.validarJWT,
    validarArchivoExiste_1.validarArchivoExiste,
    (0, express_validator_1.check)("name", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("apellidos", "El apellido es obligatorio").not().isEmpty(),
    validarCampos_1.validarCampos,
], fallecidos_1.crearFallecidoCloudinary);
/* router.post('/',
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    validarCampos
] , postFallecidos); */
router.delete("/:id", fallecidos_1.deleteFallecido);
exports.default = router;
//# sourceMappingURL=fallecidos.js.map