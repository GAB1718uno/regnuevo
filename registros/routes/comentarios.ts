import { Router } from 'express';
import { crearComentarios, obtenerComentarioIndividual, obtenerComentarios, deleteComentario, borrarTodosComentarios } from '../controllers/comentarios';

const router = Router();

/* router.get('/', obtenerLikes ) //[ validarJwt ],

router.get('/:id/fallecidos', obtenerFallecidosSepultura)
router.put('/:id', crearSepultura ) //[ validarJwt ],
router.delete('/:id', deleteSepultura ) //[ validarJwt ],
router.get('/:id', obtenerSepultura ) //[ validarJwt ],
 */

router.get('/', obtenerComentarios)

router.get('/:fallecidoId', obtenerComentarioIndividual)

router.post('/', crearComentarios ) //[ validarJwt ],

router.delete('/:fallecidoId', borrarTodosComentarios)

router.delete('/:id/usuario', deleteComentario)

export default router;