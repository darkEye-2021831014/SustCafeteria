import * as User from "../services/user.js";
import fs from "fs"
import path from "path"

export const createUser = async (req, res) => {
    const body = req.body;

    //Handle image (from memory)
    if (req.file) {
        const ext = path.extname(req.file.originalname);
        const fileName = Date.now() + ext;

        const uploadDir = path.join("uploads");
        const filePath = path.join(uploadDir, fileName);

        await fs.promises.writeFile(filePath, req.file.buffer);
        body.image = filePath;
    }

    const { name, email, password, role, contact, join_date, address, image } = body;

    // Check required fields
    const requiredFields = { name, email, password, role, contact, join_date, address, image };
    const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

    if (missingFields.length > 0) {
        return res.status(400).json({ msg: `Missing fields: ${missingFields.join(", ")}` });
    }

    try {
        const userId = await User.addUser({
            name,
            email,
            password,
            role,
            contact,
            join_date,
            address,
            image
        });
        res.status(201).json({ msg: "User created", id: userId });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const cookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // true in production https
    path: "/",
};
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Missing required fields" });
    }

    try {
        const token = await User.validateUser(email, password);
        if (!token) {
            return res.status(401).json({ msg: "Login Failed! Invalid credentials" });
        }

        // Set cookie
        res.cookie("token", token, cookieOptions);

        res.json({ msg: "Login Successful" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


export const getAllUsers = async (req, res) => {
    const users = await User.getAllUsers();
    res.json({ users });
}

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ msg: "Id Required!" });

        const user = await User.getUserById(id);
        if (!user)
            return res.status(404).json({ msg: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.getUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const deleteAllUsers = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const users = await User.getAllUsersExcept(currentUserId);

        await User.deleteAllUsersExcept(currentUserId);

        for (const user of users) {
            if (user.image) {
                try {
                    await fs.promises.unlink(user.image);
                } catch (err) {
                    console.log("File delete error:", err.message);
                }
            }
        }

        res.json({ msg: "All users deleted except current user" });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const updateUserInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword, name, contact, address } = req.body;

        if (!oldPassword && !newPassword && !name && !contact && !address) {
            return res.status(400).json({ msg: "No fields provided to update" });
        }

        const updates = { oldPassword, newPassword, name, contact, address };

        await User.updateUserById(userId, updates);

        const user = await User.getUserById(userId);
        res.status(200).json(user);
    } catch (err) {
        if (err.message.includes("Old password")) {
            return res.status(400).json({ msg: err.message });
        }
        res.status(500).json({ msg: err.message });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const userIdToDelete = parseInt(req.params.id);

        if (!userIdToDelete) {
            return res.status(400).json({ msg: "User ID required" });
        }

        if (userIdToDelete === currentUserId) {
            return res.status(400).json({ msg: "You cannot delete yourself" });
        }

        await User.deleteUserById(userIdToDelete);

        res.status(200).json({ msg: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export const updateUserRole = async (req, res) => {
    try {
        const { id, role } = req.body;
        if (!id || !role)
            return res.status(400).json({ msg: "User Id and Role is Required" });
        if (parseInt(id) === req.user.id) {
            return res.status(400).json({ msg: "You cannot change your own role" });
        }

        const updated = await User.updateUserRole(id, role);
        if (!updated) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ msg: "Role Updated Successfully" })
    }
    catch (err) {
        if (err.message === "Invalid role") {
            return res.status(400).json({ msg: err.message });
        }

        if (err.message === "User not found") {
            return res.status(404).json({ msg: err.message });
        }

        res.status(500).json({ msg: err.message });
    }
}

export const updateUserImage = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!req.file) {
            return res.status(400).json({ msg: "No image provided" });
        }

        const ext = path.extname(req.file.originalname);
        const fileName = Date.now() + ext;

        const uploadDir = path.join("uploads");
        const filePath = path.join(uploadDir, fileName);

        await fs.promises.writeFile(filePath, req.file.buffer);

        const imagePath = filePath;

        await User.updateUserImageById(userId, imagePath);

        const user = await User.getUserById(userId);

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token", cookieOptions);

    return res.json({ msg: "Logged out" });
};