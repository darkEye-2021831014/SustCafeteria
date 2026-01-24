import React, { useState } from "react";
import MenuItem from "./MenuItem";
import OrderItem from "./OrderItem";

const Order = ({ className, orderItemList }) => {
  // const [items, setItems] = useState([
  //   {
  //     id: 1,
  //     name: "সাদা ভাত",
  //     price: 20,
  //     img: "/images/vat.jpg",
  //     qty: 1,
  //   },
  //   {
  //     id: 2,
  //     name: "ডিম খিচুড়ি",
  //     price: 20,
  //     img: "/images/khichuri.jpg",
  //     qty: 1,
  //   },
  //   {
  //     id: 3,
  //     name: "মুরগির মাংস",
  //     price: 20,
  //     img: "/images/chicken.jpg",
  //     qty: 1,
  //   },
  //   {
  //     id: 4,
  //     name: "পরটা",
  //     price: 20,
  //     img: "/images/paratha.jpg",
  //     qty: 1,
  //   },
  // ]);

  // const updateQty = (id, delta) => {
  //   setItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
  //     ),
  //   );
  // };

  // const removeItem = (id) => {
  //   setItems((prev) => prev.filter((item) => item.id !== id));
  // };

  // const clearAll = () => {
  //   setItems([]);
  // };

  // const totalCost = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const [quantity, setQuantity] = useState(1);

  const orderedItems = orderItemList.map((item) => (
    <OrderItem
      key={item.id}
      {...item}
      quantity={quantity}
      setQuantity={setQuantity}
    />
  ));

  return (
    <div
      className={`flex flex-col bg-gray-100 px-7.5 py-2.5 flex-1 ${className} justify-between gap-3`}
    >
      {/* Header Section */}
      <div className="flex flex-col gap-3.75 py-2.5">
        {/* Header*/}
        <h1 className="text-center text-xl text-orange-500 font-tourney font-semibold">
          Order Items
        </h1>
        {/* Action Button*/}
        <div className="flex justify-between">
          <button
            // onClick={clearAll}
            className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            ✕ Clear
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
            ✓ Confirm
          </button>
        </div>
      </div>

      {/* Total Cost */}
      <div className="bg-white rounded-md px-1.5 py-3 text-center font-bold shadow text-sm">
        Total Cost:{" "}
        {/* {Number.isInteger(totalCost) ? `${totalCost}.00` : totalCost} ৳ */}
      </div>

      {/* Order Items List */}
      <div className="flex flex-col gap-3.75 w-full h-full">{orderedItems}</div>
    </div>
  );
};

export default Order;
