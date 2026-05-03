import { useOrderContext } from "../../contexts/OrderContext/OrderContext";
import MenuItemList from "./MenuItemList";
import Order from "./Order";

const MenuContent = ({ items, activeTab }) => {
  const { addItem } = useOrderContext();

  return (
    <div className="flex-1 min-h-full flex justify-between gap-5 bg-[#E8B5BA]/20">
      <MenuItemList
        items={items}
        activeCategory={activeTab}
        onItemClick={addItem}
        className={"flex-3"}
      />

      <Order className={"felx-1 border-l border-l-[#8B3A3A]/20"} />
    </div>
  );
};

export default MenuContent;
