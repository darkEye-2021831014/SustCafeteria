import * as ItemSupplier from "../models/item_supplier.js";

export const addItemSupplier = async (itemSupplier) => {
    return await ItemSupplier.addItemSupplier(itemSupplier);
};

export const getItemSuppliersBySupplier = async (supplier_id) => {
    return await ItemSupplier.getItemSuppliersBySupplier(supplier_id);
};

export const getSuppliersByItem = async (stock_item_id) => {
    return await ItemSupplier.getSuppliersByItem(stock_item_id);
};

export const deleteItemSupplier = async (supplier_id, stock_item_id) => {
    return await ItemSupplier.deleteItemSupplier(supplier_id, stock_item_id);
};