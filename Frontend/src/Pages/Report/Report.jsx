import React from "react";
import ReportProvider from "../../contexts/ReportContext/ReportContext";
import ReportContent from "./ReportContent";
const Report = () => {
  return (
    <div>
      <ReportProvider>
        <ReportContent />
      </ReportProvider>
    </div>
  );
};

export default Report;
