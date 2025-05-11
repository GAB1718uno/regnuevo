import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    uid?: string;
    usuario?: string;
    email?: string;
  }
}