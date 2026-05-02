import TextIconButton from "../../components/Button/TextIconButton";
import OrderItem from "./OrderItem";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import { useOrderContext } from "../../contexts/OrderContext/OrderContext";
import OrderReceipt from "./OrderReceipt";
import { useState } from "react";
import * as useOrder from "../../hooks/order";

const BottomSheet = ({ showReceipt, setShowReceipt, onConfirm }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
      ${showReceipt ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setShowReceipt(false)}
      />

      <div
        className={`relative transition-transform duration-500 ${
          showReceipt ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <OrderReceipt
          onCancel={() => setShowReceipt(false)}
          onConfirm={onConfirm}
        />
      </div>
    </div>
  );
};

const Order = ({ className }) => {
  const createOrder = useOrder.createOrder();
  const { orderItemList, totalCost, removeAllItems } = useOrderContext();
  const [showReceipt, setShowReceipt] = useState(false);

  const handleConfirm = () => {
    setShowReceipt(true);
  };

  const confirmFinal = () => {
    const payload = {
      items: orderItemList.map((item) => ({
        menu_item_id: item.id,
        unit_price: Number(item.price),
        quantity: item.qty,
      })),
      discount: 0,
    };

    createOrder.mutate(payload, {
      onSuccess: () => {
        setShowReceipt(false);
        removeAllItems();
      },
      onError: (err) => {
        console.error("Order failed:", err);
        alert("Failed to create order");
      },
    });
  };

  return (
    <div
      className={`flex flex-col bg-[#650b13]/2 px-7.5 py-2.5 flex-1 justify-start gap-3 ${className}`}
    >
      <BottomSheet
        showReceipt={showReceipt}
        setShowReceipt={setShowReceipt}
        onConfirm={confirmFinal}
      />

      {/* Header */}
      <div className="flex flex-col gap-3.75">
        <h1 className="text-center text-xl text-[#650b13] font-extrabold font-tourney">
          Order Items
        </h1>

        <div className="flex justify-between font-bold">
          <TextIconButton
            className="bg-red-500 hover:bg-red-800 text-white rounded-full"
            text="Clear All"
            icon={<RiDeleteBin6Line />}
            onClick={removeAllItems}
          />

          <TextIconButton
            className="bg-green-500 hover:bg-green-800 text-white rounded-full"
            text="Continue"
            iconRight={<FaArrowRightLong />}
            onClick={handleConfirm}
          />
        </div>
      </div>

      {/* Total */}
      <div className="bg-white rounded-md px-1.5 py-3 text-center font-bold shadow">
        Total Cost: {totalCost.toFixed(2)} ৳
      </div>

      {/* Items */}
      <div className="flex flex-col gap-5">
        {orderItemList.map((item) => (
          <OrderItem key={item.id} id={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Order;
