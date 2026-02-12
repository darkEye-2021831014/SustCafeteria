import React from "react";
import TableRow from "./TableRow";
const Table = ({ items, columns, tHeaders, statusStyle, footerRow }) => {
  return (
    <table className="w-full border border-gray-500  table-fixed mt-8">
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
          />
        ))}
      </tbody>
      {footerRow && <tfoot>{footerRow}</tfoot>}
    </table>
  );
};

export default Table;
