import { createContext, useContext } from "react";

export const MenuItemContext = createContext();

export const useMenuItemContext = () => {
  const menuItem = useContext(MenuItemContext);

  if (menuItem === undefined) {
    throw new Error("useMenuItemContext Must Be Used With A MenuItemContext");
  }
  return menuItem;
};
