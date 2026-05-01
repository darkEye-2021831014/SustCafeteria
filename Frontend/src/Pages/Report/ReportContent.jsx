import React, { useContext, useRef } from "react";
import { ReportContext } from "../../contexts/ReportContext/ReportContext";
import Table from "../../components/Table/Table";
import TableHeader from "../../components/Table/TableHeader";
import SubNavBar from "../../components/SubHeader/SubNavBar";
import PDFPrint from "../../components/Report/PDFPrint";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { getColumns, getHeaders } from "./ReportHelper";
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
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useContext(ReportContext);
  const componentRef = useRef();
  const location = useLocation();
  const tHeaders = getHeaders(activeTab);
  const columns =getColumns(activeTab);

  // const reportingTime = selectedDate.toLocaleString("default", {
  //   month: "long",
  //   year: "numeric",
  // });
 const reportingTime =
  activeTab === "Inventory Report"
    ? `${startDate || "Start"} to ${endDate || "End"}`
    : selectedDate
    ? selectedDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      })
    : "";
useEffect(() => {
  if (location.pathname.includes("sales-report")) {
    setActiveTab("Sales Report");
  } else if (location.pathname.includes("inventory-report")) {
    setActiveTab("Inventory Report");
  } else if (location.pathname.includes("attendance-report")) {
    setActiveTab("Attendance Report");
  } else {
    setActiveTab(pillList[0]);
  }
}, [location.pathname]);
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
            {/* <div className="flex justify-between">
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
            </div> */}
            <div className="flex justify-between">
              <TableHeader title="" reportingTime={reportingTime} />

              {activeTab === "Inventory Report" ? (
                <div className="flex gap-3">
                  <input
                    type="date"
                    value={startDate || ""}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-1 border rounded"
                  />
                  <input
                    type="date"
                    value={endDate || ""}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-1 border rounded"
                  />
                </div>
              ) : (
                <input
                  type="month"
                  value={`${selectedDate.getFullYear()}-${String(
                    selectedDate.getMonth() + 1,
                  ).padStart(2, "0")}`}
                  onChange={(e) =>
                    setSelectedDate(new Date(e.target.value + "-01"))
                  }
                  className="px-4 py-0 text-lg font-bold border rounded-md"
                />
              )}
            </div>
            <div ref={componentRef}>
              <h1 className="hidden print:block text-center text-2xl font-bold mb-5">
                {activeTab} for {reportingTime}
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
