import { createContext, useEffect, useState } from "react";

export const SupplierContext = createContext();

const SupplierProvider = ({ children }) => {
  const [activeType, setActiveType] = useState("SUPPLIER");
  const [isAdmin] = useState(false);

  const [suppliersData, setSuppliersData] = useState(() => {
    const stored = localStorage.getItem("suppliersData");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            name: "মোঃ গোলাম আজাদ",
            item: "চাল",
            price: 90,
            maxDue: "None",
          },
        ];
  });
  useEffect(() => {
    localStorage.setItem("suppliersData", JSON.stringify(suppliersData));
  }, [suppliersData]);

  // Pending orders
  const [pendingOrdersData, setPendingOrdersData] = useState([
    {
      id: 1,
      product: "চাল (খিচুড়ি )",
      cost: 6000,
      currentStock: 20,
      orderQty: 70,
      totalStock: 90,
      supplier: "মোঃ গোলাম আজাদ",
      status: "Pending",
      action: "Mark Delivered",
    },
  ]);

  // Critical stock
  const [criticalStockData, setCriticalStockData] = useState([
    {
      id: 1,
      product: "চাল (খিচুড়ি )",
      unit: "কেজি",
      currentStock: 20,
      minimumStock: 50,
      orderQty: 70,
      supplier: "মোঃ গোলাম আজাদ",
    },
  ]);

  const addSupplier = (newSupplier) => {
    setSuppliersData((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        maxDue: "None",
        ...newSupplier,
      },
    ]);
  };

 


const summaryCards = [
    {title: "Total Supplier",value: suppliersData.length,type: "SUPPLIER",},
    {title: "Pending Orders",value: pendingOrdersData.length,type: "PENDING",},
    {title: "Critical Stock",value: criticalStockData.length,type: "CRITICAL", },
  ];



  return (
    <SupplierContext.Provider
      value={{
        activeType,
        setActiveType,
        isAdmin,
        suppliersData,
        setSuppliersData,
        addSupplier,
        pendingOrdersData,
        setPendingOrdersData,
        criticalStockData,
        setCriticalStockData,
        summaryCards,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};

export default SupplierProvider;
