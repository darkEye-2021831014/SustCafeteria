import { useContext } from "react";
import { InventoryContext } from "../../Context/InventoryContext/InventoryProvider";


const InventoryHeader = () => {
  const { filter } = useContext(InventoryContext);

  const getTitle = () => {
    switch (filter) {
      case "Low Stock":
        return "Low Stock";
      case "Available Stock":
        return "Available Stock";
      default:
        return "Current Stock";
    }
  };

  return (
    <h2 className="text-[32px] text-[#F54758] font-bold mb-4">
      {getTitle()}
    </h2>
  );
};

export default InventoryHeader;
