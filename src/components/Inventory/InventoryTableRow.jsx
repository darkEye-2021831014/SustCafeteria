import React, { useContext, useState } from "react";
import { FaPenClip } from "react-icons/fa6";
import UpdateProductModal from "../../Pages/Inventory/UpdateProductModal";
import { InventoryContext } from "../../Context/InventoryContext/InventoryProvider";
import { RiDeleteBin5Line } from "react-icons/ri";

const InventoryTableRow = ({ item, onClick }) => {
  const { isAdmin, filter } = useContext(InventoryContext);

  return (
    <>
      <tr className="border-b text-center hover:bg-[#F54758]/5">
        <td className="border border-gray-300 px-4 py-3">{item.name}</td>
        <td className="border border-gray-300 px-4 py-3">{item.unit}</td>
        {!isAdmin && (
          <td className="border border-gray-300 px-4 py-3">{item.quantity}</td>
        )}
        <td className="border border-gray-300 px-4 py-3">{item.minQuantity}</td>

        {!isAdmin && (
          <td className="border border-gray-300 px-4 py-3">
            {item.quantity < item.minQuantity ? (
              <span className="text-red-500 font-semibold">Low Stock</span>
            ) : (
              <span className="text-green-500 font-semibold">In Stock</span>
            )}
          </td>
        )}

        {(filter === "Remove Item" || !isAdmin) && (
          <td className="border border-gray-300 px-4 py-3">
            {filter === "Remove Item" ? (
              <div
                // onClick={onClick}
                className="flex justify-center items-center text-[#f81109] cursor-pointer text-2xl"
              >
                <RiDeleteBin5Line />
              </div>
            ) : (
              <div
                onClick={onClick}
                className="flex justify-center items-center text-[#ff00008a] cursor-pointer"
              >
                <FaPenClip />
              </div>
            )}
          </td>
        )}
      </tr>
    </>
  );
};

export default InventoryTableRow;
