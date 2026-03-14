import * as Supplier from "../services/supplier.js";

export const createSupplier = async (req, res) => {
    const { name, contact, email, address } = req.body;

    // Check required fields
    if (!name) {
        return res.status(400).json({ msg: "Missing required field: name" });
    }

    try {
        const supplierId = await Supplier.addSupplier({
            name,
            contact,
            email,
            address
        });
        res.status(201).json({ msg: "Supplier created", id: supplierId });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.getAllSuppliers();
        res.status(200).json(suppliers);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await Supplier.getSupplierById(id);
        if (!supplier) {
            return res.status(404).json({ msg: "Supplier not found" });
        }
        res.status(200).json(supplier);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const deleteSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Supplier.deleteSupplierById(id);
        if (!deleted) {
            return res.status(404).json({ msg: "Supplier not found" });
        }
        res.status(200).json({ msg: "Supplier deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const deleteAllSuppliers = async (req, res) => {
    try {
        await Supplier.deleteAllSuppliers();
        res.status(200).json({ msg: "All suppliers deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};