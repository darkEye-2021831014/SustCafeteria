import React from "react";
import { format } from "date-fns";
const TableHeader = ({ title, reportingTime, type }) => {
  let headerContent;
  if (reportingTime) {
    headerContent = (
      <p className="text-[#F54758] text-[32px]">
        Reporting Time: <span>{reportingTime}</span>
      </p>
    );
  } else if (type === "PENDING" || type === "CRITICAL") {
    headerContent = (
      <p className="text-[#F54758] text-[32px]">
        Expected Delivery Date: {format(new Date(), "dd MMMM yyyy, EEEE")}
      </p>
    );
  } else {
    headerContent = null;
  }

  return (
    <div className="flex justify-between mb-4">
      <h2 className="text-[32px] text-[#F54758]">{title}</h2>
      {headerContent}
    </div>
  );
};

export default TableHeader;
