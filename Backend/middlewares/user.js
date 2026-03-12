import multer from "multer";
import path from "path";

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