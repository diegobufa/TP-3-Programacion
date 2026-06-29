import { Router } from "express";
import { registerUser, loginUser, getUserById } from "../src/services/auth.services.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me/:id", getUserById);

export default router;
