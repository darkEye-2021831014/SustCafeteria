import NavBar from "../../components/Header/NavBar";
import SubNavBar from "../../components/SubHeader/SubNavBar";
import MenuItemList from "./MenuItemList";
import Order from "./Order";
import OrderState from "../../contexts/OrderContext/OrderState";

const Menu = () => {
  return (
    <OrderState>
      <div className="flex flex-col w-full min-h-screen bg-[#E8B5BA]/20">
        <NavBar active="Menu" />
        <SubNavBar
          className="border-b border-b-[#34C759]"
          pillList={["All", "Breakfast", "Lunch", "Miscellaneous"]}
          active="All"
        />
        <div className="flex flex-1 justify-between">
          <MenuItemList />
          <Order className={"border-l border-l-[#34C759]"} />
        </div>
      </div>
    </OrderState>
  );
};

export default Menu;
