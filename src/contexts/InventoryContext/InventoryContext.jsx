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
    return stored   ? JSON.parse(stored)    : [
        {
            id: 1,        
            name: "চাল (খিচুড়ি )",
            unit: "কেজি",
            cost: 6000,
            currentStock: 20,
            minimumStock: 50,
            orderQty: 70,
            supplier: "মোঃ গোলাম আজাদ",  
            description:"চাল (খিচুড়ি ) এর বিবরণ এখানে থাকবে।"
        },
    ];
  });

  useEffect(() => {
    localStorage.setItem("ProductsData", JSON.stringify(ProductsData));
  }, [ProductsData]);

  useEffect(() => {
    setActiveTab(pillList[0]);
  }, [pillList]);

  const onTabClick = (tab) => setActiveTab(tab);
  console.log("InventoryContext value:", { isAdmin, pillList, activeTab });

  return (
    <InventoryContext.Provider
      value={{ isAdmin, pillList, activeTab, onTabClick, ProductsData, setProductsData }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
