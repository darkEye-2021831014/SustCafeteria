import { useOrderContext } from "../../contexts/OrderContext/OrderContext";
import MenuItemList from "./MenuItemList";
import Order from "./Order";

const MenuContent = ({ items, activeTab }) => {
  const { addItem } = useOrderContext();

  return (
    <div className="flex flex-1 justify-between">
      <MenuItemList
        items={items}
        activeCategory={activeTab}
        onItemClick={addItem}
      />

      <Order className={"border-l border-l-[#8B3A3A]/20"} />
    </div>
  );
};

export default MenuContent;
