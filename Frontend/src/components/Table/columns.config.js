import React from "react";
import { FaCheck, FaPlusCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

export const BASE_COLUMNS = {
  name: { key: "name", label: "নাম" },
  role: { key: "role", label: "পদবী" },
  salary: { key: "salary", label: "মাসিক বেতন" },
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
  product: { key: "name", label: "পণ্যের নাম" },
  cost: { key: "cost", label: "খরচ (টাকা)" },
  currentStock: {
    key: "current_stock",
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
  unit: { key: "unit", label: "পরিমাপের একক" },
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
      const text = cfg.text || "";
      const color = cfg.color;
      const icon = cfg.icon;
      const onClick = cfg.onClick ? () => cfg.onClick(row) : null;
      return React.createElement(
        "div",
        {
          className: `flex items-center justify-center gap-2 ${color} font-semibold cursor-pointer`,
          onClick: onClick,
        },
        icon,
        React.createElement("span", null, text),
      );
    },
  },
  minimumStock: { key: "minimum_stock", label: "ন্যূনতম মজুদ" },

  status: {
    key: "status",
    label: "স্ট্যাটাস",
    render: (row) => {
      const isLow = row.status === "Low Stock";

      return React.createElement(
        "span",
        {
          className: `font-semibold ${
            isLow ? "text-red-500" : "text-green-600"
          }`,
        },
        row.status,
      );
    },
  },
  description: {
    key: "description",
    label: "পণ্যের বিবরণ",
  },
  details: {
  key: "details",
  label: "বিস্তারিত তথ্য ",
  render: (row, activeType, override) => {
    const cfg = override || {};
    const text = cfg.text || "Show Details";
    const color = cfg.color || "text-red-600";
    const onClick = cfg.onClick ? () => cfg.onClick(row) : null;

    return React.createElement(
      "button",
      {
        type: "button",
        className: `font-semibold underline ${color} cursor-pointer`,
        onClick,
      },
      text
    );
  },
},
};
