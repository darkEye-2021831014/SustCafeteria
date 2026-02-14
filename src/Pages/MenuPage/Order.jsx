import TextIconButton from "../../components/Button/TextIconButton";
import OrderItem from "./OrderItem";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { useOrderContext } from "../../contexts/OrderContext/OrderContext";
import OrderReceipt from "./OrderReceipt";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";

const BottomSheet = ({ showReceipt, setShowReceipt, removeAllItems }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
      transition-opacity duration-300
      ${showReceipt ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setShowReceipt(false)}
      />

      {/* Sheet Container */}
      <div
        className={`relative w-fit
        transform transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${showReceipt ? "translate-y-0" : "translate-y-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scroll Wrapper */}
        <div
          className="bg-transparent rounded-2xl shadow-2xl
                        max-h-[90vh] overflow-y-auto overflow-x-hidden"
        >
          <OrderReceipt
            onCancel={() => setShowReceipt(false)}
            onConfirm={() => {
              setShowReceipt(false);
              removeAllItems();
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Order = ({ className }) => {
  const { orderItemList, totalCost, removeAllItems } = useOrderContext();
  const [showReceipt, setShowReceipt] = useState(false);

  const orderItems = orderItemList.map((item) => (
    <OrderItem key={item.id} id={item.id} />
  ));

  const handelCancelClick = () => {
    removeAllItems();
  };
  const handleConfirmClick = () => {
    setShowReceipt(true);
  };

  return (
    <div
      className={`flex flex-col bg-gray-100 px-7.5 py-2.5 flex-1 ${className} justify-between gap-3`}
    >
      {/* Bottom Up popUp Animation */}
      <BottomSheet
        showReceipt={showReceipt}
        setShowReceipt={setShowReceipt}
        removeAllItems={removeAllItems}
      />

      {/* Header Section */}
      <div className="flex flex-col gap-3.75">
        {/* Header*/}
        <h1 className="text-center text-xl text-orange-500 font-tourney font-semibold">
          Order Items
        </h1>
        {/* Action Button*/}
        <div className="flex justify-between font-bold">
          <TextIconButton
            className="bg-red-700 rounded-full shadow hover:bg-red-500"
            text="Clear All"
            icon={<RiDeleteBin6Line className="text-[20px]" />}
            onClick={handelCancelClick}
          />
          <TextIconButton
            className="bg-green-700 rounded-full shadow hover:bg-green-500 gap-2"
            text="Continue"
            iconRight={<FaArrowRightLong className="text-[24px]" />}
            onClick={handleConfirmClick}
          />
        </div>
      </div>

      {/* Total Cost */}
      <div className="bg-white rounded-md px-1.5 py-3 text-center font-bold shadow text-md">
        Total Cost: {totalCost.toFixed(2)} ৳
      </div>

      {/* Order Items List */}
      <div className="flex flex-col justify-start items-center gap-5 w-full h-full">
        {orderItems}
      </div>
    </div>
  );
};

export default Order;
