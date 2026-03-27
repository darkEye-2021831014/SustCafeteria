import React, { useContext } from "react";
import { LuCircleAlert } from "react-icons/lu";
import { InventoryContext } from "../../contexts/InventoryContext/InventoryContext";

const InventoryAlert = () => {
  const { lowStockCount } = useContext(InventoryContext);

  if (lowStockCount === 0) return null;
  return (
    <div className="mt-10 p-10 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.25)] flex items-center ">
      <div className="">
        <LuCircleAlert className="text-[#F54758] text-[45px] mr-4" />
      </div>
      <div>
        <h1 className="text-[24px] font-bold text-[#82181A]">
          Alert: Low Inventory Items Detected!
        </h1>
        <p className=" text-[#C10007] text-[20px]">
          {lowStockCount} items below minimum stock level. Review and reorder
          soon.
        </p>
      </div>
    </div>
  );
};

export default InventoryAlert;
