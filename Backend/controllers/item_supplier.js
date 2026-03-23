import * as ItemSupplier from "../services/item_supplier.js";

export const createItemSupplier = async (req, res) => {
    const { supplier_id, stock_item_id, price_per_unit, notes } = req.body;

    if (!supplier_id || !stock_item_id || !price_per_unit) {
        return res.status(400).json({ msg: "Missing required fields: supplier_id, stock_item_id, price_per_unit" });
    }

    try {
        await ItemSupplier.addItemSupplier({
            supplier_id,
            stock_item_id,
            price_per_unit: parseFloat(price_per_unit),
            notes
        });
        res.status(201).json({ msg: "Item supplier mapping created/updated" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getItemSuppliersBySupplier = async (req, res) => {
    const { supplier_id } = req.params;

    try {
        const items = await ItemSupplier.getItemSuppliersBySupplier(supplier_id);
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getSuppliersByItem = async (req, res) => {
    const { stock_item_id } = req.params;

    try {
        const suppliers = await ItemSupplier.getSuppliersByItem(stock_item_id);
        res.status(200).json(suppliers);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const deleteItemSupplier = async (req, res) => {
    const { supplier_id, stock_item_id } = req.params;

    try {
        const deleted = await ItemSupplier.deleteItemSupplier(supplier_id, stock_item_id);
        if (!deleted) {
            return res.status(404).json({ msg: "Mapping not found" });
        }
        res.status(200).json({ msg: "Item supplier mapping deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};