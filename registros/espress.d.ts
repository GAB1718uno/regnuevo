// express.d.ts
import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string; // Define la propiedad user con un id
    };
  }
}