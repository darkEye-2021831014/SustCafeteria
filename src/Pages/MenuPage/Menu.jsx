import { useState } from "react";
import NavBar from "../../components/Header/NavBar";
import SubNavBar from "../../components/SubHeader/SubNavBar";
import MenuItemList from "./MenuItemList";
import Order from "./Order";

const Menu = () => {
  const [orderItemList, setOrderItemList] = useState([]);
  const handleClick = (item) => {
    setOrderItemList([...orderItemList, item]);
    // console.log(orderItemList);
  };
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#E8B5BA]/20">
      <NavBar active="Menu" />
      <SubNavBar
        className="border-b border-b-[#34C759]"
        pillList={["All", "Breakfast", "Lunch", "Miscellaneous"]}
        active="All"
      />
      <div className="flex flex-1 justify-between">
        <MenuItemList onClick={handleClick} />
        <Order
          className={"border-l border-l-[#34C759]"}
          orderItemList={orderItemList}
        />
      </div>
    </div>
  );
};

export default Menu;
