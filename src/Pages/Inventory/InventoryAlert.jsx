import React, { useContext } from "react";
import { LuCircleAlert } from "react-icons/lu";
import { InventoryContext } from "../../Context/InventoryContext/InventoryProvider";

const InventoryAlert = () => {
    const {items}=useContext(InventoryContext);
    const lowStockItems = items.filter(item => item.quantity < item.minQuantity);
  return (
    <div className="mt-8 bg-[#E8B5BA]/20 p-6 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.25)] flex items-center p-10 mx-20">
        <div className="">
            <LuCircleAlert className="text-[#F54758] text-[45px] mr-4" />
            
        </div>
        <div>
            <h1 className='text-[24px] font-bold text-[#82181A]'>Alert: Low Inventory Items Detected!</h1>
            <p className=" text-[#C10007] text-[20px]">{lowStockItems.length} items below minimum stock level. Review and reorder soon.</p>
        </div>
    </div>
  );
};

export default InventoryAlert;
