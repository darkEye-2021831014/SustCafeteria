import React, { useContext } from "react";
import Pill from "./Pill";
import { InventoryContext } from "../../Context/InventoryContext/InventoryProvider";

const SubNavBar = () => {
  const { filter, setFilter,isAdmin } = useContext(InventoryContext);
//   const pillList = ["All Items", "Low Stock", "Available Stock"];
  const pillList = isAdmin ?
        ["Add Item", "Remove Item"] :
        ["All Items", "Low Stock", "Available Stock"];

  const subTabs = pillList.map((pill) => {
    return (
      <Pill
        key={pill}
        name={pill}
        isActive={filter===pill}
        onClick={() => setFilter(pill)}
      />
    );
  });
  return (
    <div className="flex bg-[#E8B5BA]/50  h-14 w-full items-center justify-start gap-10 px-5 py-3">
      {subTabs}
    </div>
  );
};

export default SubNavBar;
