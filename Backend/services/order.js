import { normalizedPrice } from "../utils/menu.js";
import * as OrderModel from "../models/order.js";
import * as OrderItemModel from "../models/order_item.js";


export const createOrder = async (items, discount) => {
    let subtotal = 0;
    for (const item of items) {
        const { menu_item_id, unit_price, quantity } = item;

        const total_cost = unit_price * quantity;
        subtotal += total_cost;
    }

    const normalizedDiscount = normalizedPrice(discount);
    const discountAmount = (normalizedDiscount / 100) * subtotal;

    const total = subtotal - discountAmount;

    const orderId = await OrderModel.createOrder({ subtotal, discount: normalizedDiscount, total });

    for (const item of items) {
        const { menu_item_id, unit_price, quantity } = item;
        const total_cost = unit_price * quantity;
        await OrderItemModel.createOrderItem(orderId, menu_item_id, quantity, unit_price, total_cost);
    }

    return { orderId, subtotal, discount: normalizedDiscount, total };
};

export const getAllOrders = async () => {
    return await OrderModel.getAllOrders();
};

export const getAllOrderItems = async () => {
    return await OrderItemModel.getAllOrderItems();
};