import express from "express";
import { createPurchaseOrder, getAllPurchaseOrders, getPendingPurchaseOrders, getPurchaseOrderById, markOrderDelivered, getLowStockItems } from "../controllers/purchase_order.js";
import { restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
    .post(restrictTo(['ADMIN']), createPurchaseOrder)
    .get(getAllPurchaseOrders);

router.route("/pending")
    .get(getPendingPurchaseOrders);

router.route("/low-stock")
    .get( getLowStockItems);

router.route("/:id")
    .get(getPurchaseOrderById);

router.route("/:id/deliver")
    .put(restrictTo(['ADMIN']), markOrderDelivered);

export default router;