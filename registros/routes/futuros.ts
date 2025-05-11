import { Router } from "express";
import {
  actualizarFuturos,
  borrarFuturos,
  crearFuturos,
  obtenerFuturos,
} from "../controllers/futuros";

const router = Router();

router.get("/", obtenerFuturos);
router.put("/:id", actualizarFuturos);
router.delete("/:id", borrarFuturos);
router.post("/", crearFuturos);

export default router;
