import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarSepultura,
  crearSepultura,
  crearSepulturaCloudinary,
  deleteSepultura,
  obtenerFallecidosSepultura,
  obtenerSepultura,
  obtenerSepulturas,
  obtenerSepulturaCribada,
} from "../controllers/sepulturas";
import { tiposPermitidos } from "../helpers/tiposPermitidos";
import { validarArchivoExiste } from "../middlewares/validarArchivoExiste";
import { validarCampos } from "../middlewares/validarCampos";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.get("/", obtenerSepulturas); //[ validarJwt ],
router.get("/:id", obtenerSepultura); //[ validarJwt ],
router.get("/busqueda/:termino", obtenerSepulturaCribada);
router.get("/:id/fallecidos", obtenerFallecidosSepultura);
router.put("/:id", actualizarSepultura); //[ validarJwt ],
//router.post('/', crearSepultura ) //[ validarJwt ],
router.post(
  "/",
  [
    validarJWT,
    validarArchivoExiste,
    check("tipo").custom((t) =>
      tiposPermitidos(t, ["usuarios", "fallecidos", "Sepulturas", "sepulturas"])
    ),
    validarCampos,
  ],
  crearSepulturaCloudinary
);

router.delete("/:id", deleteSepultura); //[ validarJwt ],

export default router;
