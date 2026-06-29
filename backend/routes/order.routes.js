import { Router } from "express";
import {
  createOrder,
  findOrder,
  findOrders,
  findOrdersByUser,
  updateOrderStatus,
} from "../src/services/order.services.js";

const router = Router();

router.get("/orders", findOrders);
router.get("/orders/user/:userId", findOrdersByUser);
router.get("/orders/:id", findOrder);
router.post("/orders", createOrder);
router.patch("/orders/:id/status", updateOrderStatus);

export default router;
