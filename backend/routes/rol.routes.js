import { Router } from "express";
import { verifyToken } from "../src/middlewares/auth.middleware.js";
import { verifyRole } from "../src/middlewares/rol.middlewares.js";

import {
  getUsuarios,
  updateUsuario,
  deleteUsuario
} from "../src/services/rol.services.js";

const router = Router();

router.get(
  "/usuarios",
  verifyToken,
  verifyRole(2, 3),
  getUsuarios
);

router.put(
  "/usuarios/:id",
  verifyToken,
  verifyRole(3),
  updateUsuario
);

router.delete(
  "/usuarios/:id",
  verifyToken,
  verifyRole(3),
  deleteUsuario
);

export default router;