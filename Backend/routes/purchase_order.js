import express from "express";
import { createPurchaseOrder, getAllPurchaseOrders, getPendingPurchaseOrders, getPurchaseOrderById, markOrderDelivered, getLowStockItems } from "../controllers/purchase_order.js";
import { adminOnly, restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
    .post(adminOnly, createPurchaseOrder)
    .get(getAllPurchaseOrders);

router.route("/pending")
    .get(getPendingPurchaseOrders);

router.route("/low-stock")
    .get(getLowStockItems);

router.route("/:id")
    .get(getPurchaseOrderById);

router.route("/:id/deliver")
    .put(adminOnly, markOrderDelivered);

export default router;