import express from "express";
import { createPurchaseOrder, getAllPurchaseOrders, getPendingPurchaseOrders, getPurchaseOrderById, markOrderDelivered, getLowStockItems } from "../controllers/purchase_order.js";
import { restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
    .post(restrictTo(['ADMIN']), createPurchaseOrder)
    .get(restrictTo(['ADMIN']), getAllPurchaseOrders);

router.route("/pending")
    .get(restrictTo(['ADMIN']), getPendingPurchaseOrders);

router.route("/low-stock")
    .get(restrictTo(['ADMIN']), getLowStockItems);

router.route("/:id")
    .get(restrictTo(['ADMIN']), getPurchaseOrderById);

router.route("/:id/deliver")
    .put(restrictTo(['ADMIN']), markOrderDelivered);

export default router;