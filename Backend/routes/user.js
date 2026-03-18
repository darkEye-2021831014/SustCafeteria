import express from "express"
import { createUser, loginUser, getAllUsers, getUserById, getUserInfo } from "../controllers/user.js"
import { verifyEmail, restrictTo } from "../middlewares/auth.js";
import { upload } from "../middlewares/user.js";
import { restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
    .post(upload.single("image"), verifyEmail, createUser)
    .get(restrictTo(['ADMIN']), getAllUsers);

router.route("/login")
    .post(loginUser)
    .get(getUserInfo);

//Dynamic Routes Should Be Last in the execution order
router.route("/:id")
    .get(restrictTo(['ADMIN']), getUserById);

export default router;