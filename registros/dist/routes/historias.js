"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historias_1 = require("../controllers/historias");
const router = (0, express_1.Router)();
router.post('/', historias_1.crearHistoriaCloudinary);
router.get('/:fallecidoId', historias_1.getHistoriaPorFallecido);
exports.default = router;
//# sourceMappingURL=historias.js.map