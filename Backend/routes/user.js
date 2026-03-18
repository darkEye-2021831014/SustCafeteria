import express from "express"
import { createUser, loginUser, getAllUsers, getUserById, getUserInfo, deleteAllUsers, updateUserInfo, deleteUserById, updateUserRole } from "../controllers/user.js"
import { verifyEmail, loginRequired, adminOnly } from "../middlewares/auth.js";
import { upload } from "../middlewares/user.js";

const router = express.Router();

router.route("/")
    .post(upload.single("image"), verifyEmail, createUser)
    .get(adminOnly, getAllUsers)
    .delete(adminOnly, deleteAllUsers)
    .patch(adminOnly, updateUserRole);

router.route("/login")
    .post(loginUser)
    .get(loginRequired, getUserInfo)
    .patch(loginRequired, updateUserInfo);

//Dynamic Routes Should Be Last in the execution order
router.route("/:id")
    .get(adminOnly, getUserById)
    .delete(adminOnly, deleteUserById);

export default router;