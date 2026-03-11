import express from "express"
import { createUser, loginUser } from "../controllers/user.js"
import { upload, verifyEmail } from "../middlewares/user.js";

const router = express.Router();

router.post("/", upload.single("image"), verifyEmail, createUser);
router.post("/login", loginUser)

export default router;