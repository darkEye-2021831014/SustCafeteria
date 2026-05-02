import { useState } from "react";
import SubNavBar from "../../components/SubHeader/SubNavBar";
import OrderState from "../../contexts/OrderContext/OrderState";
import MenuItemList from "./MenuItemList";
import Order from "./Order";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <OrderState>
      <div className="flex flex-col w-full min-h-screen bg-[#ffff]/10">
        <SubNavBar
          className="border-b border-b-[#8B3A3A]/20"
          pillList={["All", "Breakfast", "Lunch", "Miscellaneous"]}
          active={activeTab}
          onTabClick={setActiveTab}
        />
        <div className="flex flex-1 justify-between">
          <MenuItemList category={activeTab} />
          <Order className={"border-l border-l-[#8B3A3A]/20"} />
        </div>
      </div>
    </OrderState>
  );
};

export default Menu;
