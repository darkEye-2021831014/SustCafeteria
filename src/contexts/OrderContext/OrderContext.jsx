import { createContext, useContext } from "react";

export const OrderContext = createContext();

export const useOrderContext = () => {
  const orderItem = useContext(OrderContext);

  if (orderItem === undefined) {
    throw new Error("useMenuItemContext Must Be Used With A MenuItemContext");
  }
  return orderItem;
};
