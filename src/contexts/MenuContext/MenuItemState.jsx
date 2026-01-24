import React from "react";
import { MenuItemContext } from "./MenuItemContext";

const MenuItemState = ({ children, ...rest }) => {
  return (
    <MenuItemContext.Provider value={rest}>{children}</MenuItemContext.Provider>
  );
};

export default MenuItemState;
