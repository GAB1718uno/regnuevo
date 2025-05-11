import { Router } from "express";
import {
  //actualizarFavoritos,
  //borrarFavoritos,
  obtenerFavoritos,
  crearFavoritos,
} from "../controllers/favoritos";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.get("/", validarJWT, obtenerFavoritos);
//router.put("/:fallecidoId", validarJwt, toggleFavorito);
router.put("/:fallecidoId", validarJWT, crearFavoritos);
//router.delete("/:id", borrarFavoritos);

export default router;
