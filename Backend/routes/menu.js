import express from "express";
import * as MenuController from "../controllers/menu.js";
import { adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
    .post(adminOnly, MenuController.createItem)
    .get(MenuController.getAllItems)
    .patch(adminOnly, MenuController.updateItem);

router.route("/:id")
    .delete(adminOnly, MenuController.deleteItem);

export default router;
