import React from "react";
import TableRow from "./TableRow";
const Table = ({ items, columns, tHeaders, statusStyle, isPurchaseModalOpen, footerRow, viewType,columnOverrides }) => {
  console.log("Table items:", statusStyle);
  return (
    <table className="w-full  table-fixed border-gray-500 mt-8">
      <thead className="bg-[#E8B5BA]/35">
        <tr>
          {tHeaders.map((header, index) => (
            <th key={index} className="border border-gray-500 px-4 py-3">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <TableRow
            key={index}
            item={item}
            columns={columns}
            statusStyle={statusStyle}
            isPurchaseModalOpen={isPurchaseModalOpen}
            viewType={viewType}
            columnOverrides={columnOverrides}
          />
        ))}
      </tbody>
      {footerRow && <tfoot>{footerRow}</tfoot>}
    </table>
  );
};

export default Table;
