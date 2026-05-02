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

export const getAllItems = async (req, res) => {
    try {
        const items = await MenuService.getAllItems();

        res.status(200).json({
            success: true,
            data: items
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve menu items"
        });
    }
};

export const updateItem = async (req, res) => {
    try {
        const result = await MenuService.updateItem(req.body);

        res.status(200).json({
            success: true,
            message: "Item updated successfully"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        await MenuService.deleteItem(id);

        res.status(200).json({
            success: true,
            message: "Menu item deleted successfully"
        });
    } catch (err) {
        console.error("Error deleting menu item", err);

        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};