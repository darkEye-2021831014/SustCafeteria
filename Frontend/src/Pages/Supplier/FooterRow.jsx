import React from "react";

const FooterRow = ({ activeType, tableData }) => {
  if (activeType !== "PENDING") return null;

  const totalCost = tableData.reduce((total, item) => total + item.cost, 0);

  return (
    <tr className="bg-[#E8B5BA]/35 font-semibold">
      <td
        colSpan={4}
        className="border border-gray-400 px-4 py-3 text-center"
      >
        মোট খরচ (টাকা) :
      </td>

      <td
        colSpan={3}
        className="border border-gray-400 px-4 py-3 text-center font-bold"
      >
        {totalCost}
      </td>
    </tr>
  );
};

export default FooterRow;
