import NavBar from "../../components/Header/NavBar";
import SubNavBar from "../../components/SubHeader/SubNavBar";
import MenuItemList from "./MenuItemList";
import Order from "./Order";
import OrderState from "../../contexts/OrderContext/OrderState";
import { useState } from "react";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <OrderState>
      <div className="flex flex-col w-full min-h-screen bg-[#E8B5BA]/20">
        <NavBar active="Menu" />
        <SubNavBar
          className="border-b border-b-[#34C759]"
          pillList={["All", "Breakfast", "Lunch", "Miscellaneous"]}
          active={activeTab}
          onTabClick={setActiveTab}
        />
        <div className="flex flex-1 justify-between">
          <MenuItemList category={activeTab} />
          <Order className={"border-l border-l-[#34C759]"} />
        </div>
      </div>
    </OrderState>
  );
};

export default Menu;
