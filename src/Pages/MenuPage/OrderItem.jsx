import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa6";
import MenuItem from "./MenuItem";
import { useOrderContext } from "../../contexts/OrderContext/OrderContext";

const OrderItem = ({ id }) => {
  const { orderItemList, updateQty, removeItem } = useOrderContext();

  const item = orderItemList.find((item) => item.id === id);
  if (!item) return null;

  const { price, image, name, qty } = item;
  const itemCost = (price * qty).toFixed(2);

  return (
    <div className="flex justify-between w-full items-center">
      <MenuItem image={image} name={name} price={price} />

      <div className="flex flex-col w-50 justify-around h-full">
        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <FaMinus
            onClick={() => updateQty(id, -1)}
            className="cursor-pointer hover:text-red-500"
          />

          <span className="px-4 py-1.5 font-semibold rounded-lg w-full shadow-sm">
            Quantity: {qty}
          </span>

          <FaPlus
            onClick={() => updateQty(id, 1)}
            className="cursor-pointer hover:text-green-500"
          />
        </div>

        {/* Item Cost */}
        <div className="bg-white rounded-lg px-3 py-1.5 shadow-sm text-center">
          Item Cost: <span className="font-semibold">{itemCost} ৳</span>
        </div>

        {/* Remove */}
        <button
          onClick={() => removeItem(id)}
          className="bg-white text-red-500 font-bold py-1.5 rounded-lg shadow hover:bg-red-200 flex justify-center items-center gap-1"
        >
          Remove Item <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
