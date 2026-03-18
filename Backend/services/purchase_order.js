import * as PurchaseOrder from "../models/purchase_order.js";
import * as Inventory from "../models/inventory.js";

export const addPurchaseOrder = async (order) => {
    return await PurchaseOrder.addPurchaseOrder(order);
};

export const getAllPurchaseOrders = async () => {
    return await PurchaseOrder.getAllPurchaseOrders();
};

export const getPendingPurchaseOrders = async () => {
    return await PurchaseOrder.getPendingPurchaseOrders();
};

export const getPurchaseOrderById = async (id) => {
    return await PurchaseOrder.getPurchaseOrderById(id);
};

export const markOrderDelivered = async (id) => {
    const order = await PurchaseOrder.getPurchaseOrderById(id);
    if (!order || order.status !== 'PENDING') {
        throw new Error('Order not found or already delivered');
    }

    // Update stock
    await Inventory.updateStock(order.stock_item_id, order.order_quantity);

    // Update order status
    await PurchaseOrder.updatePurchaseOrderStatus(id, 'DELIVERED');

    return true;
};

export const getLowStockItems = async () => {
    return await PurchaseOrder.getLowStockItems();
};