import * as User from "../services/user.js";

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
        res.cookie("token", token);

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
        if (!req.user) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const user = await User.getUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};