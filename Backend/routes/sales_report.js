import express from "express";
import { 
    getSalesReport,
    getTotalSales
 } from "../controllers/sales_report.js";

const router = express.Router();

router.get("/", getSalesReport);
router.get("/total", getTotalSales);


export default router;