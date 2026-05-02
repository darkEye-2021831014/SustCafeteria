import { RiArrowDropDownLine } from "react-icons/ri";
import { BASE_COLUMNS } from "./columns.config";
import React from "react";
import { FaCheck, FaPlusCircle } from "react-icons/fa";
export const TABLE_CONFIG = {
  SUPPLIER: {
    title: "Total Supplier List",
    columns: ["name", "item", "price", "maxDue"],
    dataKey: "suppliersData",
  },

  PENDING: {
    title: "Pending Orders List",
    columns: ["product","cost","currentStock","orderQty","totalStock","supplier","action",],
    dataKey: "pendingOrdersData",
    actionColumnConfig : {
        text: "Mark Delivered",
        icon: React.createElement(FaCheck),
        color: "text-green-500 font-bold",
      },

  },

  CRITICAL: {
    title: "Low Stock Items (Order Now)",
    columns: ["product","unit","currentStock","minimumStock","orderQty","supplier","action",],
    dataKey: "criticalStockData",
    actionColumnConfig : {
        text: "Order Now",
        icon: React.createElement(FaPlusCircle),
        color: "text-[#CB30E0] font-bold",
      },
  },
  ITEM: {
    title: "Current Inventory",
    columns: ["product","unit","currentStock","minimumStock","description","status","action"],
    dataKey: "ProductsData",
  
},
  STAFF:{
    title: "Total Staff List",
    columns: ["name","role","details","action"],
    dataKey: "StaffsData",
  },
};

export const resolveColumns = (type, options = {}) => {
  const { exclude = [], include = [] } = options;

  return TABLE_CONFIG[type].columns
    .filter((key) => !exclude.includes(key))
    .map((key) => BASE_COLUMNS[key])
    .concat(include.map((key) => BASE_COLUMNS[key]));
};
