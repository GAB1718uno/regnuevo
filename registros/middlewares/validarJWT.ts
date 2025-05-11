import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const validarJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extrae el token del encabezado

  if (!token) {
    return res.status(401).json({ msg: "No autenticado al validar JWT" });
  }

  console.log("Comprobando...")

  try {
    // Decodifica el token y verifica su validez
    const decoded = jwt.verify(token, process.env.SECRET_JWT_SEED!) as { sub: string }; // Asegúrate de que decoded.sub sea de tipo string

    console.log ("Verifico token... e imprimo: "+ JSON.stringify(decoded, null, 2))
    // Asigna el userId al objeto req.user
    req.user = { id: decoded.sub }; // Asegúrate de que decoded.sub sea un string
    
    console.log("A ver el userID ahora: " + req.user.id)
    
    next(); // Continúa con la siguiente función de middleware o ruta
  } catch (error) {
    console.error("Token inválido:", error);
    return res.status(401).json({ msg: "Token inválido" });
  }
};