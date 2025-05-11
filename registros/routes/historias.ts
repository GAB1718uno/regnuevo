import { Router } from "express";
import { crearHistoriaCloudinary, getHistoriaPorFallecido } from "../controllers/historias";

const router = Router();

router.post('/', crearHistoriaCloudinary )

router.get('/:fallecidoId', getHistoriaPorFallecido)

export default router