import express from "express";
import { verifyUser, restrictTo } from "../middlewares/auth.js";
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


router.post( "/", restrictTo(["ADMIN"]), createItem ); 
//router.post( "/", createItem );  //temp


router.get( "/", getInventory );  //all
router.get( "/low-stock", getLowStock );
router.get("/available",  getAvailableStock);
router.get("/:id", getItemById);  // get single item


//update
router.put( "/:id/quantity", restrictTo(["ADMIN"]), updateQuantity ); // quantity update
router.put( "/:id/info", restrictTo(["ADMIN"]), updateStockItemInfo );  //item's information update
router.delete( "/:id", restrictTo(["ADMIN"]), deleteItem );


export default router;