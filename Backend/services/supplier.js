import * as Supplier from "../models/supplier.js";

export const addSupplier = async (supplier) => {
    const supplierId = await Supplier.addSupplier(supplier);
    return supplierId;
};

export const getAllSuppliers = async () => {
    return await Supplier.getAllSuppliers();
};

export const getSupplierById = async (id) => {
    return await Supplier.getSupplierById(id);
};

export const deleteSupplierById = async (id) => {
    return await Supplier.deleteSupplierById(id);
};

export const deleteAllSuppliers = async () => {
    return await Supplier.deleteAllSuppliers();
};