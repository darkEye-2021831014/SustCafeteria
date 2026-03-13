import express from "express";
import { verifyUser, restrictTo } from "../middlewares/auth.js";
import {
    createItem,
    getInventory,
    getLowStock,
    getAvailableStock,
    updateItemStock,
    deleteItem
} from "../controllers/inventory.js";

const router = express.Router();


//router.post( "/", verifyUser, restrictTo(["ADMIN"]), createItem );
//router.get("/available", verifyUser, getAvailableStock);


router.post( "/", createItem );  //temp

router.get( "/", getInventory );
router.get( "/low-stock", getLowStock );
router.get("/available",  getAvailableStock);


//update
router.put( "/:id", verifyUser, restrictTo(["ADMIN"]), updateItemStock );
router.delete( "/:id", verifyUser, restrictTo(["ADMIN"]), deleteItem );


export default router;