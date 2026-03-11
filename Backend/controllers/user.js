import * as user from "../services/user.js";

export const createUser = async (req, res) => {
    const body = req.body;
    if (req.file) body.image = req.file.path;

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
        const userId = await user.addUser({
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


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Missing required fields" });
    }

    try {
        const token = await user.validateUser(email, password);
        if (!token) {
            return res.status(401).json({ msg: "Login Failed! Invalid credentials" });
        }

        // Set cookie
        res.cookie("token", token, { httpOnly: true, secure: true });

        res.json({ msg: "Login Successful" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};