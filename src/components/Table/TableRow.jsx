import React from 'react';

const TableRow = ({ item, columns, statusStyle }) => {
  return (
    <tr className="border-b text-center hover:bg-[#F54758]/5">
      {columns.map((col, index) => (
        <td key={index} className="border border-gray-400 px-4 py-3">
          {col.type === "status" ? (
            <span
              className={`px-3 py-1 rounded-full ${
                statusStyle?.[item[col.key]] || ""
              }`}
            >
              {item[col.key] || "-"}
            </span>
          ) : (
            item[col.key] || "-"
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;