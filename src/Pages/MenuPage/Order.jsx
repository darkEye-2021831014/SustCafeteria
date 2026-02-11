import TextIconButton from "../../components/Button/TextIconButton";
import OrderItem from "./OrderItem";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { useOrderContext } from "../../contexts/OrderContext/OrderContext";

const Order = ({ className }) => {
  const { orderItemList, totalCost, removeAllItems } = useOrderContext();

  const orderItems = orderItemList.map((item) => (
    <OrderItem key={item.id} id={item.id} />
  ));

  const handelCancelClick = () => {
    removeAllItems();
  };
  const handleConfirmClick = () => {};

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
        <div className="flex justify-between font-bold">
          <TextIconButton
            className="bg-red-700 rounded-full shadow hover:bg-red-500"
            text="Cancel"
            icon={<IoClose className="text-[24px]" />}
            onClick={handelCancelClick}
          />
          <TextIconButton
            className="bg-green-700 rounded-full shadow hover:bg-green-500"
            text="Confirm"
            icon={<FaCheck className="text-[24px]" />}
            onClick={handleConfirmClick}
          />
        </div>
      </div>

      {/* Total Cost */}
      <div className="bg-white rounded-md px-1.5 py-3 text-center font-bold shadow text-sm">
        Total Cost: {totalCost.toFixed(2)} ৳
      </div>

      {/* Order Items List */}
      <div className="flex flex-col gap-3.75 w-full h-full">{orderItems}</div>
    </div>
  );
};

export default Order;
