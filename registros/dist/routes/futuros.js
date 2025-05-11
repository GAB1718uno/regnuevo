"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const futuros_1 = require("../controllers/futuros");
const router = (0, express_1.Router)();
router.get("/", futuros_1.obtenerFuturos);
router.put("/:id", futuros_1.actualizarFuturos);
router.delete("/:id", futuros_1.borrarFuturos);
router.post("/", futuros_1.crearFuturos);
exports.default = router;
//# sourceMappingURL=futuros.js.map