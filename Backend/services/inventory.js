import {
    addStockItem,
    getAllStockItems,
    getLowStockItems,
    getAvailableStockItems,
    getStockItemById,
    updateStockQuantity,
    updateInfo,
    deleteStockItem
} from "../models/inventory.js";


export const createStockItem = async (data) => {
    return await addStockItem(data);
};


export const fetchAllInventory = async () => {
    return await getAllStockItems();
};


export const fetchLowStockItems = async () => {
    return await getLowStockItems();
};

export const fetchAvailableStock = async () => {
    return await getAvailableStockItems();
};


export const fetchStockItemById = async (id) => {
    return await getStockItemById(id);
};


export const updateQuantity = async (id, quantity) => {
    return await updateStockQuantity(id, quantity);
};

export const updateItemInfo = async (id, data) => {
    return await updateInfo(id, data);
};


export const removeStockItem = async (id) => {
    return await deleteStockItem(id);
};