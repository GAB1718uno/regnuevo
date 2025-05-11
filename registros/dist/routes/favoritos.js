"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favoritos_1 = require("../controllers/favoritos");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.get("/", validarJWT_1.validarJWT, favoritos_1.obtenerFavoritos);
//router.put("/:fallecidoId", validarJwt, toggleFavorito);
router.put("/:fallecidoId", validarJWT_1.validarJWT, favoritos_1.crearFavoritos);
//router.delete("/:id", borrarFavoritos);
exports.default = router;
//# sourceMappingURL=favoritos.js.map