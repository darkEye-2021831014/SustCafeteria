import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import {
    createItem,
    getInventory,
    getLowStock,
    getAvailableStock,
    getItemById,
    updateQuantity,
    updateStockItemInfo,
    deleteItem
} from "../controllers/inventory.js";

const router = express.Router();


router.post("/", adminOnly, createItem);
//router.post( "/", createItem );  //temp


router.get("/", getInventory);  //all
router.get("/low-stock", getLowStock);
router.get("/available", getAvailableStock);
router.get("/:id", getItemById);  // get single item


//update
router.put("/:id/quantity", adminOnly, updateQuantity); // quantity update
router.put("/:id/info", adminOnly, updateStockItemInfo);  //item's information update
router.delete("/:id", adminOnly, deleteItem);


export default router;