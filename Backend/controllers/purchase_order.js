import * as PurchaseOrder from "../services/purchase_order.js";

export const createPurchaseOrder = async (req, res) => {
    const { stock_item_id, supplier_id, order_quantity, expected_delivery } = req.body;

    if (!stock_item_id || !supplier_id || !order_quantity || !expected_delivery) {
        return res.status(400).json({ msg: "Missing required fields: stock_item_id, supplier_id, order_quantity, expected_delivery" });
    }

    try {
        const orderId = await PurchaseOrder.addPurchaseOrder({
            stock_item_id,
            supplier_id,
            order_quantity: parseInt(order_quantity),
            expected_delivery
        });
        res.status(201).json({ msg: "Purchase order created", id: orderId });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getAllPurchaseOrders = async (req, res) => {
    try {
        const orders = await PurchaseOrder.getAllPurchaseOrders();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getPendingPurchaseOrders = async (req, res) => {
    try {
        const orders = await PurchaseOrder.getPendingPurchaseOrders();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getPurchaseOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await PurchaseOrder.getPurchaseOrderById(id);
        if (!order) {
            return res.status(404).json({ msg: "Purchase order not found" });
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const markOrderDelivered = async (req, res) => {
    const { id } = req.params;

    try {
        await PurchaseOrder.markOrderDelivered(id);
        res.status(200).json({ msg: "Order marked as delivered and stock updated" });
    } catch (err) {
        if (err.message.includes('not found')) {
            return res.status(404).json({ msg: err.message });
        }
        res.status(500).json({ msg: err.message });
    }
};

export const getLowStockItems = async (req, res) => {
    try {
        const items = await PurchaseOrder.getLowStockItems();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};