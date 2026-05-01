import * as MenuService from "../services/menu.js";

export const createItem = async (req, res) => {
    try {
        const result = await MenuService.createItem(req.body);

        res.status(201).json({
            success: true,
            message: "Item created successfully",
            data: result
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};