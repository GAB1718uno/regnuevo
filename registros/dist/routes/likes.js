"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likes_1 = require("../controllers/likes");
const router = (0, express_1.Router)();
/* router.get('/', obtenerLikes ) //[ validarJwt ],

router.get('/:id/fallecidos', obtenerFallecidosSepultura)
router.put('/:id', crearSepultura ) //[ validarJwt ],
router.delete('/:id', deleteSepultura ) //[ validarJwt ],
router.get('/:id', obtenerSepultura ) //[ validarJwt ],
 */
router.get('/', likes_1.obtenerLikes);
router.get('/:fallecidoId', likes_1.obtenerLikeIndividual);
router.delete('/:fallecidoId/:usuarioId', likes_1.borrarLikes);
router.post('/', likes_1.crearLikes); //[ validarJwt ],
exports.default = router;
//# sourceMappingURL=likes.js.map