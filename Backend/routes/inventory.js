import express from "express";
import { verifyUser, restrictTo } from "../middlewares/auth.js";
import {
    createItem,
    getInventory,
    getLowStock,
    updateItemStock,
    deleteItem
} from "../controllers/inventory.js";

const router = express.Router();


//router.post( "/", verifyUser, restrictTo(["ADMIN"]), createItem );
router.post( "/", createItem );  //temp
router.get( "/", getInventory );

router.get( "/low-stock", getLowStock );

//update
router.put( "/:id", verifyUser, restrictTo(["ADMIN"]), updateItemStock );

router.delete( "/:id", verifyUser, restrictTo(["ADMIN"]), deleteItem );


export default router;