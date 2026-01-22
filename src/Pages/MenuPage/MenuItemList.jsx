import React from "react";
import MenuItem from "./MenuItem";

const MenuItemList = ({ menuItemList }) => {
  // 5 items in a Row
  const menu = menuItemList.map((rowItems) => (
    <div className="flex justify-around items-center w-full h-fit">
      {rowItems.map(({ name, price, image }) => (
        <MenuItem name={name} price={price} image={image} />
      ))}
    </div>
  ));
  return (
    <div className="flex flex-col w-[70%] h-full justify-around p-5">
      {menu}
    </div>
  );
};

export default MenuItemList;
