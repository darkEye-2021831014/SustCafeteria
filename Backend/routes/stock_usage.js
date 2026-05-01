import express from "express";
import { createUsage } from "../controllers/stock_usage.js";

const router = express.Router();

router.post("/create", createUsage);

export default router;