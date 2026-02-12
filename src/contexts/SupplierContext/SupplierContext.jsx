import { createContext, useState } from "react";

export const SupplierContext = createContext();
const SupplierProvider = ({ children }) => {
  const [activeType, setActiveType] = useState("SUPPLIER");
 const suppliersData = [
  {
    id: 1,
    name: "মোঃ গোলাম আজাদ",
    item: "চাল (খিচুড়ি )",
    price: 90,
    maxDue: "None",
  },
  {
    id: 2,
    name: "মোঃ কাওসার হাসান",
    item: "ডাল (মসুর)",
    price: 100,
    maxDue: "4 hours",
  },
  {
    id: 3,
    name: "রবেল শেখ",
    item: "চাল (খিচুড়ি )",
    price: 85,
    maxDue: "12 hours",
  },
  {
    id: 4,
    name: "মোঃ ছালেক আহমেদ",
    item: "তেল (সয়াবিন)",
    price: 180,
    maxDue: null,
  },
  {
    id: 5,
    name: "মাহবুব আলম সাফাত",
    item: "ডাল (মসুর)",
    price: 110,
    maxDue: null,
  },
  {
    id: 6,
    name: "রইজুল হক",
    item: "ডাল (বুট)",
    price: 65,
    maxDue: "2 Days",
  },
  {
    id: 7,
    name: "মুনজির আহমেদ",
    item: "পেঁয়াজ",
    price: 80,
    maxDue: "1 Day, 6 Hours",
  },
  {
    id: 8,
    name: "রিপন রাউৎ",
    item: "চাল (ভাত )",
    price: 60,
    maxDue: "None",
  },
];
const pendingOrdersData = [
  {
    id: 1,
    product: "চাল (খিচুড়ি )",
    cost: 6000,
    currentStock: 20,
    orderQty: 70,
    totalStock: 90,
    supplier: "মোঃ গোলাম আজাদ",
    status: "Pending",
    action:"Mark Delivered",
  },
  {
    id: 2,
    product: "ডাল (মসুর)",
    cost: 4800,
    currentStock: 10,
    orderQty: 40,
    totalStock: 50,
    supplier: "মাহবুব আলম সাফাত",
    status: "Pending",
    action:"Mark Delivered",
  },
  {
    id: 3,
    product: "ডাল (বুট)",
    cost: 1950,
    currentStock: 5,
    orderQty: 30,
    totalStock: 35,
    supplier: "রইজুল হক",
    status: "Pending",
    action:"Mark Delivered",
  },
  {
    id: 4,
    product: "তেল (সয়াবিন)",
    cost: 8100,
    currentStock: 5,
    orderQty: 45,
    totalStock: 50,
    supplier: "মোঃ ছালেক আহমেদ",
    status: "Pending",
    action:"Mark Delivered",
  },
];
const criticalStockData = [
  {
    id: 1,
    product: "চাল (খিচুড়ি )",
    unit: "কেজি",
    currentStock: 20,
    minimumStock: 50,
    orderQty: 70,
    supplier: "মোঃ গোলাম আজাদ",
  },
  {
    id: 2,
    product: "ডাল (মসুর)",
    unit: "কেজি",
    currentStock: 10,
    minimumStock: 20,
    orderQty: 40,
    supplier: "মাহবুব আলম সাফাত",
  },
  {
    id: 3,
    product: "ডাল (বুট)",
    unit: "কেজি",
    currentStock: 5,
    minimumStock: 10,
    orderQty: 30,
    supplier: "রইজুল হক",
  },
  {
    id: 4,
    product: "তেল (সয়াবিন)",
    unit: "লিটার",
    currentStock: 5,
    minimumStock: 20,
    orderQty: 45,
    supplier: "মোঃ ছালেক আহমেদ",
  },
];
return (
    <SupplierContext.Provider
      value={{
        activeType,
        setActiveType,
        suppliersData,
        pendingOrdersData,
        criticalStockData,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};
export default SupplierProvider;