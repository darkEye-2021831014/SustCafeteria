import multer from "multer";
import path from "path";
import { getUserByEmail } from "../models/user.js";
import fs from "fs";

export const verifyEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            // Delete uploaded file if exists
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(400).json({ msg: "Email is required" });
        }

        const user = await getUserByEmail(email);
        if (user) {
            // Delete uploaded file if exists
            if (req.file) fs.unlinkSync(req.file.path);

            return res.status(409).json({ msg: "User Already Exists!" });
        }

        next();
    } catch (err) {
        // Delete uploaded file in case of error
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(500).json({ msg: `Error in email Verification: ${err.message}` });
    }
};


// Set storage destination and filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/"); // folder where images will be saved
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

// Filter to allow only images
const fileFilter = async (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"), false);
};

export const upload = multer({ storage, fileFilter });