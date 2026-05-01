import * as MenuModel from "../models/menu.js";
import { convertBanglaToEnglishNumber } from "../utils/menu.js";

export const createItem = async (data) => {
    const { name, image, price, category } = data;

    if (!name || !price || !category) {
        throw new Error("Name, price and category are required");
    }

    const normalizedPrice = parseFloat(
        convertBanglaToEnglishNumber(price)
    );
    if (isNaN(normalizedPrice)) {
        throw new Error("Invalid price format");
    }

    if (normalizedPrice < 0) {
        throw new Error("Price cannot be negative");
    }

    console.log("Creating menu item with data:", { name, price: normalizedPrice, category, image });
    return await MenuModel.createItem({ name, image, price: normalizedPrice, category });
};

export const getAllItems = async () => {
    return await MenuModel.getAllItems();
};