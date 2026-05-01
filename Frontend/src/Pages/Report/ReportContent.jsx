import React, { useContext, useRef } from "react";
import { ReportContext } from "../../contexts/ReportContext/ReportContext";
import Table from "../../components/Table/Table";
import TableHeader from "../../components/Table/TableHeader";
import SubNavBar from "../../components/SubHeader/SubNavBar";
import PDFPrint from "../../components/Report/PDFPrint";
import { useLocation } from "react-router";
const ReportContent = () => {
  const {
    attendance,
    selectedDate,
    setSelectedDate,
    activeTab,
    setActiveTab,
    onTabClick,
    pillList,
    loading,
  } = useContext(ReportContext);
  const componentRef = useRef();
  const location = useLocation();
  const tHeaders = ["নাম", "পদবী", "উপস্থিত", "অনুপস্থিত", "দেরি"];

  const columns = [
    { key: "name" },
    { key: "position" },
    { key: "present" },
    { key: "absent" },
    { key: "late" },
  ];

  const reportingTime = selectedDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  if (location.pathname.includes("sales-report")) {
    setActiveTab("Sales Report");
  } else if (location.pathname.includes("inventory-report")) {
    setActiveTab("Inventory Report");
  } else if (location.pathname.includes("attendance-report")) {
    setActiveTab("Attendance Report");
  } else {
    setActiveTab(pillList[0]);
  }
  return (
    <div>
      <SubNavBar
        pillList={pillList}
        active={activeTab}
        onTabClick={onTabClick}
      />
      <div className="px-15 py-5">
        {loading ? (
          <div className="text-center py-10 text-gray-500 text-lg">
            Data is Loading ...
          </div>
        ) : (
          <div className="mt-15 p-20 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.25)]">
            <div className="flex justify-between">
              <TableHeader title="" reportingTime={reportingTime} />
              <input
                type="month"
                value={`${selectedDate.getFullYear()}-${String(
                  selectedDate.getMonth() + 1,
                ).padStart(2, "0")}`}
                onChange={(e) =>
                  setSelectedDate(new Date(e.target.value + "-01"))
                }
                className="px-4 py-0 text-lg font-bold border rounded-md bg-[#F54758]/5 text-black border-[#F54758] focus:outline-none focus:[#F54758]/50"
              />
            </div>
            <div ref={componentRef}>
              <h1 className="hidden print:block text-center text-2xl font-bold mb-5">
                Attendance Report for {reportingTime}
              </h1>
              <Table items={attendance} columns={columns} tHeaders={tHeaders} />
            </div>
            <PDFPrint
              targetRef={componentRef}
              title="Attendance Report"
              buttonText="Generate Report"
              className="mt-5 justify-end flex"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportContent;
