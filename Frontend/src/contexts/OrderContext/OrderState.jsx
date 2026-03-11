import { useState } from "react";
import { OrderContext } from "./OrderContext";

const OrderState = ({ children }) => {
  const [orderItemList, setOrderItemList] = useState([]);

  const addItem = (item) => {
    setOrderItemList((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);

      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setOrderItemList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setOrderItemList((prev) => prev.filter((item) => item.id !== id));
  };

  const removeAllItems = () => {
    setOrderItemList([]);
  };

  const totalCost = orderItemList.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  return (
    <OrderContext.Provider
      value={{
        orderItemList,
        addItem,
        updateQty,
        removeItem,
        totalCost,
        removeAllItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
