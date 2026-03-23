import express from "express";
import { createSupplier, getAllSuppliers, getSupplierById, deleteSupplierById, deleteAllSuppliers } from "../controllers/supplier.js";
import { adminOnly, restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
    .post(adminOnly, createSupplier)
    .get(getAllSuppliers)
    .delete(adminOnly, deleteAllSuppliers);

router.route("/:id")
    .get(getSupplierById)
    .delete(adminOnly, deleteSupplierById);

export default router;