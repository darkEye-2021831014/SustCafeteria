import express from "express";
import * as StaffController from "../controllers/staff.js";
import { verifyEmail, restrictTo } from "../middlewares/auth.js";
import { upload } from "../middlewares/user.js";
console.log("Staff route loaded");

const router = express.Router();

router.post(
  "/",
  restrictTo(["admin"]),
  upload.single("image"),
  StaffController.createStaff,
);
router.get("/", restrictTo(["admin"]), StaffController.getAllStaff);
router.get("/:id", restrictTo(["admin"]), StaffController.getStaff);
router.delete("/:id", restrictTo(["admin"]), StaffController.deleteStaff);
router.delete("/", restrictTo(["admin"]), StaffController.deleteAllStaff);

export default router;
