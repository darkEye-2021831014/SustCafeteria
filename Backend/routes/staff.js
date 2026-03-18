import express from "express";
import * as StaffController from "../controllers/staff.js";
import { restrictTo } from "../middlewares/auth.js";
import { upload } from "../middlewares/user.js";
console.log("Staff route loaded");

const router = express.Router();

router.post(
  "/",
  restrictTo(["ADMIN"]),
  upload.single("image"),
  StaffController.createStaff,
);
router.get("/", restrictTo(["ADMIN"]), StaffController.getAllStaff);
router.get("/:id", restrictTo(["ADMIN"]), StaffController.getStaff);
router.delete("/:id", restrictTo(["ADMIN"]), StaffController.deleteStaff);
router.delete("/", restrictTo(["ADMIN"]), StaffController.deleteAllStaff);

export default router;
