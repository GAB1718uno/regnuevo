import { Router } from 'express';
import { crearLikes, obtenerLikeIndividual, obtenerLikes, borrarLikes } from '../controllers/likes';

const router = Router();

/* router.get('/', obtenerLikes ) //[ validarJwt ],

router.get('/:id/fallecidos', obtenerFallecidosSepultura)
router.put('/:id', crearSepultura ) //[ validarJwt ],
router.delete('/:id', deleteSepultura ) //[ validarJwt ],
router.get('/:id', obtenerSepultura ) //[ validarJwt ],
 */

router.get('/', obtenerLikes)

router.get('/:fallecidoId', obtenerLikeIndividual)

router.delete('/:fallecidoId/:usuarioId', borrarLikes)

router.post('/', crearLikes ) //[ validarJwt ],

export default router;