import React, { useContext } from "react";
import { SupplierContext } from "../../contexts/SupplierContext/SupplierContext";
import { FaCheck } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { FaPlusCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

const TableRow = ({ item, columns, statusStyle }) => {
  const { activeType } = useContext(SupplierContext);

  return (
    <tr className="border-b text-center hover:bg-[#F54758]/5">
      {columns.map((col, index) => {
        if (col.key === "action") {
          return (
            <td key={index} className="border  border-gray-400 px-4 py-3 ">
              {activeType === "PENDING" && (
                <button className="w-full flex items-center justify-center text-green-500 font-semibold cursor-pointer">
                  <FaCheck className="mr-2 " />
                  Mark Delivered
                </button>
              )}
              {activeType === "CRITICAL" && (
                <button className=" w-full flex items-center justify-center text-[#CB30E0] font-semibold cursor-pointer">
                  <FaPlusCircle className="mr-2" />
                  Order Now
                </button>
              )}
            </td>
          );
        }
        if (col.key === "supplier") {
          return (
            <td key={index} className="border border-gray-400 px-4 py-3">
                <div className="w-full flex items-center justify-center text-[#FF8D28] font-semibold">
                  {item[col.key]}
                  <RiArrowDropDownLine className="text-4xl cursor-pointer" />
                </div>
            </td>
          );
        }
        const value = item[col.key] ?? "-";
        let appliedClass = "";

        if (statusStyle && typeof value === "string") {
          for (const key in statusStyle) {
            if (value.toLowerCase().includes(key.toLowerCase())) {
              appliedClass = statusStyle[key];
              break;
            }
          }
        }

        return (
          <td key={index} className="border border-gray-400 px-4 py-3">
            <span className={`px-3 py-1 rounded-full ${appliedClass}`}>
              {value}
            </span>
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
