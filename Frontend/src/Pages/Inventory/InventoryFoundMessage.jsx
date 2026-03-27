import React from "react";
import { useLocation } from "react-router";

const InventoryFoundMessage = ({ products, loading, children }) => {
  const location = useLocation();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  let message = "";

  if (location.pathname.includes("low-stock")) {
    if (products.length === 0) {
      message = "No low stock items!";
    }
  } else if (location.pathname.includes("available")) {
    if (products.length === 0) {
      message = "No available stock items";
    }
  } else {
    if (products.length === 0) {
      message = "📭 No items found. Add new items.";
    }
  }

  if (message) {
    return (
      <div className="flex flex-col items-center justify-center mt-16">
        <div className="text-5xl mb-4">📦</div>
        <h2 className="text-3xl font-semibold text-[#F54758]">{message}</h2>
      </div>
    );
  }
  return children;
};

export default InventoryFoundMessage;
