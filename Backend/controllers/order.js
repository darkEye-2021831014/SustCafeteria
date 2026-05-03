import * as orderService from "../services/order.js";

export const createOrder = async (req, res) => {
    try {
        const { items, discount } = req.body; // Expecting an array of items with menu_item_id and quantity
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "Items are required and should be an array" });
        }

        if (typeof discount !== "number" || discount < 0) {
            return res.status(400).json({ error: "Discount should be a non-negative number" });
        }

        const order = await orderService.createOrder(items, discount);
        res.status(201).json(order);
    } catch (err) {
        console.error("Error creating order", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();

        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (err) {
        console.error("Error fetching orders", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders"
        });
    }
};


export const getAllOrderItems = async (req, res) => {
    try {
        const items = await orderService.getAllOrderItems();

        res.status(200).json({
            success: true,
            data: items
        });
    } catch (err) {
        console.error("Error fetching order items", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch order items"
        });
    }
};



export const getTodayOrders = async (req, res) => {

    try {

        const orders = await orderService.getTodayOrders();

        res.status(200).json({
            success: true,
            data: orders
        });

    } catch (error) {

        console.error("Error fetching today's orders", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch today's orders"
        });
    }

};