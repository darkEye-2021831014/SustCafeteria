import * as MenuModel from "../models/menu.js";
import { normalizedPrice } from "../utils/menu.js";

export const createItem = async (data) => {
    const { name, image, price, category } = data;

    if (!name || !price || !category) {
        throw new Error("Name, price and category are required");
    }
    const normPrice = normalizedPrice(price);

    return await MenuModel.createItem({ name, image, price: normPrice, category });
};

export const getAllItems = async () => {
    return await MenuModel.getAllItems();
};

export const updateItem = async (data) => {
    const { id, name, image, price, category } = data;

    if (!id) {
        throw new Error("Item ID is required for update");
    }

    const fields = {};

    if (name !== undefined) fields.name = name;
    if (image !== undefined) fields.image = image;
    if (price !== undefined) fields.price = normalizedPrice(price);
    if (category !== undefined) fields.category = category;

    return await MenuModel.updateItem({ id, fields });
};

export const deleteItem = async (id) => {
    if (!id) {
        throw new Error("Menu item ID is required");
    }

    const isDeleted = await MenuModel.deleteItem(id);

    if (!isDeleted) {
        throw new Error("Menu item not found or already deleted");
    }

    return true;
};