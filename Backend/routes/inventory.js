import express from "express";
import { verifyUser, restrictTo } from "../middlewares/auth.js";
import {
    createItem,
    getInventory,
    getLowStock,
    getAvailableStock,
    updateQuantity,
    deleteItem
} from "../controllers/inventory.js";

const router = express.Router();


router.post( "/", restrictTo(["ADMIN"]), createItem ); 
//router.post( "/", createItem );  //temp


router.get( "/", getInventory );  //all
router.get( "/low-stock", getLowStock );
router.get("/available",  getAvailableStock);


//update
router.put( "/:id", restrictTo(["ADMIN"]), updateQuantity );
router.delete( "/:id", restrictTo(["ADMIN"]), deleteItem );


export default router;