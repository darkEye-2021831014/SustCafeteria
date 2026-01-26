import { createContext, useEffect, useState } from "react";

export const InventoryContext = createContext();

const InventoryProvider = ({ children }) => {
  const isAdmin=false;
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(isAdmin ? "Add Item" : "All Items");
  const [loading, setLoading] = useState(false);


  // 🔹 API call
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = isAdmin ? await fetch("../../../public/addInventory.json") : await fetch("../../../public/Inventory.json");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // 🔹 Filter logic
  const filteredItems = items.filter((item) => {
    if (filter === "Low Stock")
      return item.quantity < item.minQuantity;

    if (filter === "Available Stock")
      return item.quantity >= item.minQuantity;
    if (filter === "Add Item")
      return true; // Placeholder for admin "Add Item" view
    if (filter === "Remove Item")
      return true;

    return true; // ALL
  });

  const updateItem = (id, updatedData) => {
    console.log("Updating item with id:", id, "with data:", updatedData);
    setItems((prev) =>
      prev.map((item) =>
        console.log("Checking item:", item.id) &&
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
  };

  return (
    <InventoryContext.Provider
      value={{
        items,
        filteredItems,
        filter,
        setFilter,
        loading,
        updateItem,
        isAdmin,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
