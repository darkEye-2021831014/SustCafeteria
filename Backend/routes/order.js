import express from 'express';
import * as OrderController from "../controllers/order.js";
import { adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.get("/today", adminOnly, OrderController.getTodayOrders);

router.route("/")
    .post(OrderController.createOrder)
    .get(adminOnly, OrderController.getAllOrders);

router.route("/items")
    .get(adminOnly, OrderController.getAllOrderItems);


export default router;