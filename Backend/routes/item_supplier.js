import express from "express";
import { createItemSupplier, getItemSuppliersBySupplier, getSuppliersByItem, deleteItemSupplier } from "../controllers/item_supplier.js";
import { adminOnly, restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
    .post(adminOnly, createItemSupplier);

router.route("/supplier/:supplier_id")
    .get(getItemSuppliersBySupplier);

router.route("/item/:stock_item_id")
    .get(getSuppliersByItem);

router.route("/:supplier_id/:stock_item_id")
    .delete(adminOnly, deleteItemSupplier);

export default router;