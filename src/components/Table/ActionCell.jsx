import { FaCheck } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ActionCell = ({ viewType }) => {
  if (viewType === "PENDING") {
    return (
      <button className="w-full flex items-center justify-center text-green-500 font-semibold">
        <FaCheck className="mr-2" />
        Mark Delivered
      </button>
    );
  }

  if (viewType === "CRITICAL") {
    return (
      <button className="w-full flex items-center justify-center text-[#CB30E0] font-semibold">
        <FaPlusCircle className="mr-2" />
        Order Now
      </button>
    );
  }

  if (viewType === "ITEM_MODAL") {
    return (
      <button className="w-full flex items-center justify-center text-red-500 font-semibold">
        <MdDelete className="mr-2" />
        Remove Item
      </button>
    );
  }

  return null;
};

export default ActionCell;
