import { createContext, useState, useEffect } from "react";

export const InventoryContext = createContext();

const InventoryProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(true);
  const pillList = isAdmin
    ? ["Add Item", "Remove Item"]
    : ["Add Item", "Low Stock", "Available Stock"];
  const [activeTab, setActiveTab] = useState(pillList[0]);
  const [ProductsData, setProductsData] = useState(() => {
    const stored = localStorage.getItem("ProductsData");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem("ProductsData", JSON.stringify(ProductsData));
  }, [ProductsData]);
  useEffect(() => {
    setActiveTab(pillList[0]);
  }, [pillList]);
  const onTabClick = (tab) => setActiveTab(tab);
  return (
    <InventoryContext.Provider
      value={{
        isAdmin,
        pillList,
        activeTab,
        onTabClick,
        ProductsData,
        setProductsData,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
