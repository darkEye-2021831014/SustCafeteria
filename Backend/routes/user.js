import express from "express"
import { createUser, loginUser, getAllUsers, getUserById, getUserInfo, deleteAllUsers, updateUserInfo } from "../controllers/user.js"
import { verifyEmail, restrictTo, loginRequired } from "../middlewares/auth.js";
import { upload } from "../middlewares/user.js";

const router = express.Router();

router.route("/")
    .post(upload.single("image"), verifyEmail, createUser)
    .get(restrictTo(['ADMIN']), getAllUsers)
    .delete(restrictTo(['ADMIN']), deleteAllUsers);

router.route("/login")
    .post(loginUser)
    .get(loginRequired, getUserInfo)
    .patch(loginRequired, updateUserInfo);

//Dynamic Routes Should Be Last in the execution order
router.route("/:id")
    .get(restrictTo(['ADMIN']), getUserById);

export default router;