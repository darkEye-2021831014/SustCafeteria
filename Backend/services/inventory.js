import {
    addStockItem,
    getAllStockItems,
    getLowStockItems,
    updateStock,
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


export const updateStockItem = async (id, quantity) => {
    return await updateStock(id, quantity);
};


export const removeStockItem = async (id) => {
    return await deleteStockItem(id);
};