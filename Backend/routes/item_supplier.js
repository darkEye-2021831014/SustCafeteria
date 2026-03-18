import express from "express";
import { createItemSupplier, getItemSuppliersBySupplier, getSuppliersByItem, deleteItemSupplier } from "../controllers/item_supplier.js";
import { restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
    .post(restrictTo(['ADMIN']), createItemSupplier);

router.route("/supplier/:supplier_id")
    .get( getItemSuppliersBySupplier);

router.route("/item/:stock_item_id")
    .get(getSuppliersByItem);

router.route("/:supplier_id/:stock_item_id")
    .delete(restrictTo(['ADMIN']), deleteItemSupplier);

export default router;