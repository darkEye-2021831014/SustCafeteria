import { useState } from "react";
import SubNavBar from "../../components/SubHeader/SubNavBar";
import OrderState from "../../contexts/OrderContext/OrderState";
import MenuItemList from "./MenuItemList";
import Order from "./Order";
import LoadingPage from "../ErrorPage/LoadingPage";
import MenuContent from "./MenuContent";

import * as useMenu from "../../hooks/menu";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("All");

  const { data, isLoading, error } = useMenu.getAllItems();

  if (isLoading) return <LoadingPage MESSAGE="Loading Menu..." />;
  if (error) return <LoadingPage MESSAGE="Failed to load menu" />;

  const items =
    data?.data?.map((item) => ({
      ...item,
      image: item.image,
      price: Number(item.price),
    })) || [];

  return (
    <OrderState>
      <div className="h-full flex flex-col">
        <div className="shrink-0">
          <SubNavBar
            className="border-b border-b-[#8B3A3A]/20"
            pillList={["All", "Breakfast", "Lunch", "Miscellaneous"]}
            active={activeTab}
            onTabClick={setActiveTab}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <MenuContent items={items} activeTab={activeTab} />
        </div>
      </div>
    </OrderState>
  );
};

export default Menu;
