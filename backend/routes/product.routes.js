import { Router } from "express";
import {
  findProducts,
  findProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../src/services/product.services.js";

const router = Router();

router.get("/products", findProducts);
router.get("/products/:id", findProduct);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
