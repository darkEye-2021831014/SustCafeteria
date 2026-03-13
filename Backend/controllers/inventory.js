import * as Stock from "../services/inventory.js";


export const createItem = async (req, res) => {

    try {

        const { name, category, unit, minimum_stock, current_stock } = req.body;

        if (!name || !unit) {
            return res.status(400).json({
                message: "Name and unit are required"
            });
        }

        if (minimum_stock < 0 || current_stock < 0) {
            return res.status(400).json({
                message: "Stock cannot be negative"
            });
        }

        await Stock.createStockItem({ name, category, unit, minimum_stock, current_stock });

        res.status(201).json({
            message: "Inventory item created successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};



export const getInventory = async (req, res) => {

    try {
        const items = await Stock.fetchAllInventory();
        res.json(items);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};



export const getLowStock = async (req, res) => {

    try {

        const items = await Stock.fetchLowStockItems();
        res.json(items);

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });
    }
};



export const updateItemStock = async (req, res) => {

    try {

        const { id } = req.params;
        const { quantity } = req.body;

        if (quantity < 0) {

            return res.status(400).json({
                message: "Stock cannot be negative"
            });
        }

        await Stock.updateStockItem(id, quantity);

        res.json({
            message: "Stock updated successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

};



export const deleteItem = async (req, res) => {

    try {

        const { id } = req.params;
        await Stock.removeStockItem(id);

        res.json({
            message: "Item deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};