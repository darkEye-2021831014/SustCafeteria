import React from "react";
import { FaCheck, FaPlusCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

export const BASE_COLUMNS = {
  name: { key: "name", label: "Name" },
  item: { key: "item", label: "Item" },
  price: { key: "price", label: "Price (Per Unit)" },
  maxDue: {
    key: "maxDue",
    label: "Max Due Time",
    dynamicClass: (row) => {
      const value = row.maxDue?.toLowerCase() || "";
      if (value.includes("day")) return "text-red-500 font-semibold";
      if (value.includes("hour")) return "text-yellow-500 font-semibold";
      if (value.includes("none")) return "text-green-500";
      return "";
    },
  },
  product: { key: "product", label: "পণ্যের নাম" },
  cost: { key: "cost", label: "খরচ (টাকা)" },
  currentStock: {
    key: "currentStock",
    label: "বর্তমান মজুদ",
    dynamicClass: (row) =>
      row.currentStock < 10 ? "text-red-500 font-bold" : "text-green-600",
  },
  orderQty: {
    key: "orderQty",
    label: "অর্ডার পরিমাণ",
    className: "text-green-500 ",
  },
  totalStock: {
    key: "totalStock",
    label: "মোট মজুদ",
    className: "text-red-500",
  },
  unit: { key: "unit", label: "একক" },
  supplier: {
    key: "supplier",
    label: "সরবরাহকারী",
    render: (row, viewType, override) => {
      const cfg = override || {};
      return React.createElement(
        "div",
        {
          className: `flex items-center justify-center gap-2 ${cfg.color || "#FF6347"} font-semibold`,
        },
        React.createElement("span", null, row.supplier),
        cfg.icon,
      );
    },
  },
  action: {
    key: "action",
    label: "Action",
    render: (row, activeType, override) => {
      const cfg = override || {};
      const text = cfg.text;
      const color = cfg.color;
      const icon = cfg.icon;

      return React.createElement(
        "div",
        {
          className: `flex items-center justify-center gap-2 ${color} font-semibold`,
        },
        icon,
        React.createElement("span", null, text),
      );
    },
  },
  minimumStock: { key: "minimumStock", label: "ন্যূনতম মজুদ" },
};
