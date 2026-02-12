import React, { useContext } from "react";
import { SupplierContext } from "../../contexts/SupplierContext/SupplierContext";
import { FaCheck } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { FaPlusCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import ActionCell from "./ActionCell";
import DataCell from "./DataCell";
const TableRow = ({ item, columns, statusStyle, viewType }) => {
  return (
    <tr className="border-b text-center hover:bg-[#F54758]/5">
      {columns.map((col, index) => {
        if (col.key === "action") {
          return (
            <td key={index} className="border border-gray-400 px-4 py-3">
              <ActionCell viewType={viewType} />
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
        return (
          <td key={index} className="border border-gray-400 px-4 py-3">
            <DataCell value={item[col.key]} statusStyle={statusStyle} />
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
