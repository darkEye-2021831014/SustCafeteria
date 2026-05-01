import * as MenuModel from "../models/menu.js";
import { convertBanglaToEnglishNumber } from "../utils/menu.js";

export const createItem = async (data) => {
    const { name, image, price } = data;

    if (!name || !price) {
        throw new Error("Name and price are required");
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

    return await MenuModel.createItem({ name, image, price: normalizedPrice });
};