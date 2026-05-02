import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa6";
import MenuItem from "./MenuItem";
import { useOrderContext } from "../../contexts/OrderContext/OrderContext";

const OrderItem = ({ id }) => {
  const { orderItemList, updateQty, removeItem } = useOrderContext();

  const item = orderItemList.find((item) => item.id === id);
  if (!item) return null;

  const { price, image, name, qty } = item;
  const itemCost = (Number(price) * qty).toFixed(2);

  return (
    <div
      className="
        flex items-center gap-3 w-full
        bg-white/80 rounded-xl
        p-3 sm:p-4
        shadow-sm hover:shadow-md transition
      "
    >
      {/* ── Compact Menu Item (scaled properly) ── */}
      <div className="w-[110px] sm:w-[130px] shrink-0">
        <MenuItem image={image} name={name} price={price} />
      </div>

      {/* ── Controls Section ── */}
      <div className="flex flex-col gap-2 w-full">
        {/* Quantity Row */}
        <div className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2 text-sm">
          <FaMinus
            onClick={() => updateQty(id, -1)}
            className="cursor-pointer text-gray-600 hover:text-red-500 transition"
          />

          <span className="font-semibold text-gray-700">Qty: {qty}</span>

          <FaPlus
            onClick={() => updateQty(id, 1)}
            className="cursor-pointer text-gray-600 hover:text-green-500 transition"
          />
        </div>

        {/* Cost Row */}
        <div className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2 text-sm">
          <span className="text-gray-600">Item Cost</span>
          <span className="font-semibold text-gray-800">{itemCost} ৳</span>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeItem(id)}
          className="
            flex items-center justify-center gap-2
            bg-red-50 text-red-500 hover:bg-red-100
            font-semibold text-sm py-2 rounded-lg
            transition
          "
        >
          Remove Item <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
