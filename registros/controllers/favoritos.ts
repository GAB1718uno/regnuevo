import { Request, Response } from 'express';
import Favorito from "../models/favoritos";
import Fallecido from "../models/fallecido"; // Importa el modelo de fallecidos


interface FavoritoParams {
  userId: string;
  fallecidoId: string;
}

// Importa también el modelo o función que actualice el estado del fallecido en la tabla "fallecidos"

export const crearFavoritos = async (req: Request, res: Response) => {
  const userId = req.user?.id; // Obtén el userId del token JWT
  const { fallecidoId } = req.params;

  if (!userId) {
    return res.status(401).json({ ok: false, msg: "Usuario no autenticado" });
  }

  try {
    // Busca el fallecido en la base de datos
    const fallecido = await Fallecido.findByPk(fallecidoId);

    if (!fallecido) {
      return res.status(404).json({ ok: false, msg: "Fallecido no encontrado" });
    }

    // Verifica si el favorito ya existe
    const favoritoExistente = await Favorito.findOne({ where: { userId, fallecidoId } });

    if (favoritoExistente) {
      // Si el favorito existe, elimínalo
      await favoritoExistente.destroy();
      // Actualiza el campo `favorito` en la tabla `fallecidos` a 0 (no favorito)
      await fallecido.update({ favorito: 0 });
      return res.json({ ok: true, msg: "Eliminado de favoritos", favorito: false });
    } else {
      // Si el favorito no existe, créalo
      await Favorito.create({ userId, fallecidoId });
      // Actualiza el campo `favorito` en la tabla `fallecidos` a 1 (favorito)
      await fallecido.update({ favorito: 1 });
      return res.json({ ok: true, msg: "Agregado a favoritos", favorito: true });
    }
  } catch (error) {
    console.error("Error en toggleFavorito:", error);
    res.status(500).json({ ok: false, msg: "Error en el servidor" });
  }
};





export const obtenerFavoritos = async (req: Request, res: Response) => {
  const userId = req.user?.id; // Asegúrate de que validarJwt asigna req.uid
  console.log("Este es el userId: "+ userId)

  if (!userId) {
    return res.status(401).json({ msg: "No autenticado" });
  }

  try {
    const favoritos = await Favorito.findAll({
      where: { userId },
      include: [{
        model: Fallecido,
        as: "fallecido",
      }],
    });

    // Ahora TypeScript sabe que cada favorito puede tener la propiedad "fallecido"
    const fallecidosFavoritos = favoritos.map((fav) => fav.fallecido);
    res.json(fallecidosFavoritos);
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};