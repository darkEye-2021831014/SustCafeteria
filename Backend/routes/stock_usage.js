import express from "express";
import { createUsage } from "../controllers/stock_usage.js";
import { getUsageHistory } from "../controllers/stock_usage.js";

const router = express.Router();

router.post("/create", createUsage);
router.get("/usageRecord", getUsageHistory);

export default router;