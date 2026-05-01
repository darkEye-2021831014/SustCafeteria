import React, { useContext } from "react";
import { ReportContext } from "../../contexts/ReportContext/ReportContext";
import Table from "../../components/Table/Table";
import TableHeader from "../../components/Table/TableHeader";
import SubNavBar from "../../components/SubHeader/SubNavBar";
const ReportContent = () => {
  const {
    attendance,
    selectedDate,
    setSelectedDate,
    activeTab,
    onTabClick,
    pillList,
  } = useContext(ReportContext);

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

  return (
    <div>
      <SubNavBar
        pillList={pillList}
        active={activeTab}
        onTabClick={onTabClick}
      />
      <div className="px-15 py-5">
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
              className="px-2 py-1 text-lg font-bold border rounded-md bg-[#F54758]/5 text-black border-[#F54758] focus:outline-none focus:[#F54758]/50"
            />
          </div>

          <Table items={attendance} columns={columns} tHeaders={tHeaders} />
        </div>
      </div>
    </div>
  );
};

export default ReportContent;
