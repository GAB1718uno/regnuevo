"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const sepulturas_1 = require("../controllers/sepulturas");
const tiposPermitidos_1 = require("../helpers/tiposPermitidos");
const validarArchivoExiste_1 = require("../middlewares/validarArchivoExiste");
const validarCampos_1 = require("../middlewares/validarCampos");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.get("/", sepulturas_1.obtenerSepulturas); //[ validarJwt ],
router.get("/:id", sepulturas_1.obtenerSepultura); //[ validarJwt ],
router.get("/busqueda/:termino", sepulturas_1.obtenerSepulturaCribada);
router.get("/:id/fallecidos", sepulturas_1.obtenerFallecidosSepultura);
router.put("/:id", sepulturas_1.actualizarSepultura); //[ validarJwt ],
//router.post('/', crearSepultura ) //[ validarJwt ],
router.post("/", [
    validarJWT_1.validarJWT,
    validarArchivoExiste_1.validarArchivoExiste,
    (0, express_validator_1.check)("tipo").custom((t) => (0, tiposPermitidos_1.tiposPermitidos)(t, ["usuarios", "fallecidos", "Sepulturas", "sepulturas"])),
    validarCampos_1.validarCampos,
], sepulturas_1.crearSepulturaCloudinary);
router.delete("/:id", sepulturas_1.deleteSepultura); //[ validarJwt ],
exports.default = router;
//# sourceMappingURL=sepulturas.js.map