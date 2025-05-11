"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comentarios_1 = require("../controllers/comentarios");
const router = (0, express_1.Router)();
/* router.get('/', obtenerLikes ) //[ validarJwt ],

router.get('/:id/fallecidos', obtenerFallecidosSepultura)
router.put('/:id', crearSepultura ) //[ validarJwt ],
router.delete('/:id', deleteSepultura ) //[ validarJwt ],
router.get('/:id', obtenerSepultura ) //[ validarJwt ],
 */
router.get('/', comentarios_1.obtenerComentarios);
router.get('/:fallecidoId', comentarios_1.obtenerComentarioIndividual);
router.post('/', comentarios_1.crearComentarios); //[ validarJwt ],
router.delete('/:fallecidoId', comentarios_1.borrarTodosComentarios);
router.delete('/:id/usuario', comentarios_1.deleteComentario);
exports.default = router;
//# sourceMappingURL=comentarios.js.map