import NavBar from "../../components/Header/NavBar";
import SubNavBar from "../../components/SubHeader/SubNavBar";
import MenuItem from "./MenuItem";
import MenuItemList from "./MenuItemList";
import PlainRice from "../../assets/MenuItemImages/PlainRice.webp";

const Menu = () => {
  let menuItemList = [];
  for (let i = 0; i < 3; i++) {
    let curItem = [];
    for (let j = 0; j < 5; j++) {
      curItem.push({ name: "সাদা ভাত", price: "২০.০০", image: PlainRice });
    }
    menuItemList.push(curItem);
  }
  return (
    <div className="flex flex-col w-screen h-screen">
      <NavBar active="Menu" />
      <SubNavBar
        className="border-b border-b-[#34C759]"
        pillList={["All", "Breakfast", "Lunch", "Miscellaneous"]}
        active="All"
      />
      <div className="flex w-full h-full bg-[#E8B5BA]/20">
        <MenuItemList menuItemList={menuItemList} />
      </div>
    </div>
  );
};

export default Menu;
