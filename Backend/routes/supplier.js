import express from "express";
import { createSupplier, getAllSuppliers, getSupplierById, deleteSupplierById, deleteAllSuppliers } from "../controllers/supplier.js";
import { restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
    .post(restrictTo(['ADMIN']), createSupplier)
    .get( getAllSuppliers)
    .delete(restrictTo(['ADMIN']), deleteAllSuppliers);

router.route("/:id")
    .get(restrictTo(['ADMIN']), getSupplierById)
    .delete(restrictTo(['ADMIN']), deleteSupplierById);

export default router;