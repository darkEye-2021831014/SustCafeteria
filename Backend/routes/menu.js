import express from "express";
import * as MenuController from "../controllers/menu.js";
import { adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
    .post(adminOnly, MenuController.createItem);

export default router;
