import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import {
  deleteFallecido,
  getFallecido,
  getFallecidos,
  postFallecidos,
  putFallecido,
  obtenerRelacionado,
  getFallecidosCriba,
  crearFallecidoCloudinary,
  actualizarFallecidoCloudinary,
  getFallecidosTodos,
  getFallecidosCribaNyA,
  putFallecidoFavorito,
  obtenerFallecidosPorSepultura,
} from "../controllers/fallecidos";
import { validarJWT } from "../middlewares/validarJWT";
import { tiposPermitidos } from "../helpers/tiposPermitidos";
import { validarArchivoExiste } from "../middlewares/validarArchivoExiste";

const router = Router();

//tipo aqui es apellido
router.get("/sepultura/relacionados/:calle/:numero", obtenerFallecidosPorSepultura)
router.get("/:pageSize/:page", getFallecidos);
router.get("/", getFallecidos);
router.get("/busqueda/:nombre/:apellidos", getFallecidosCribaNyA); 
router.get("/busqueda/:tipo/:termino", getFallecidosCriba);

//Con limit y paginanción
router.get("/:id/:sepult/:sepulturaId", obtenerRelacionado);

//Original sin limit ni paginación
router.get("/todos", getFallecidosTodos);

router.put('/:id/favorito', putFallecidoFavorito);
router.get("/:id", getFallecido);
router.put(
  "/:tipo/:id",
  [
    validarJWT,
    validarArchivoExiste,
    check("tipo").custom((t) =>
      tiposPermitidos(t, ["usuarios", "fallecidos", "Sepulturas", "sepulturas"])
    ),
    validarCampos,
  ],
  actualizarFallecidoCloudinary
);
router.post(
  "/",
  [
    validarJWT,
    validarArchivoExiste,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("apellidos", "El apellido es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearFallecidoCloudinary
);
/* router.post('/',
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    validarCampos
] , postFallecidos); */

router.delete("/:id", deleteFallecido);

export default router;
