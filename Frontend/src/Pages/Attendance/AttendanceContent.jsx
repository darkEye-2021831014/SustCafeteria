import React, { useContext } from "react";
import PageHeader from "../../components/Table/PageHeader";
import Card from "../../components/Table/Card";
import TableHeader from "../../components/Table/TableHeader";
import Table from "../../components/Table/Table";
import { AttendanceContext } from "../../contexts/AttendanceContext/AttendanceContext";

const AttendanceContent = () => {
  const reportingTime = "সকাল ৮:০০ টা";

  const {
    loading,
    mergedList,
    filteredStaff,
    filter,
    setFilter,
    markAttendance,
    canMarkAttendance,
    attendanceWindowText,
  } = useContext(AttendanceContext);

  const summary = [
    {
      title: "Total Staff",
      value: mergedList.filter((s) => s.role?.toLowerCase() !== "manager")
        .length,
      filter: "ALL",
    },
    {
      title: "Present",
      value: mergedList.filter(
        (s) => s.status === "Present" && s.role?.toLowerCase() !== "manager",
      ).length,
      filter: "Present",
    },
    {
      title: "Late",
      value: mergedList.filter(
        (s) => s.status === "Late" && s.role?.toLowerCase() !== "manager",
      ).length,
      filter: "Late",
    },
    {
      title: "Absent",
      value: mergedList.filter(
        (s) => s.status === "Absent" && s.role?.toLowerCase() !== "manager",
      ).length,
      filter: "Absent",
    },
  ];

  const attendanceColumns = [
    { key: "name", label: "নাম" },
    { key: "role", label: "পদবী" },
    { key: "status", label: "স্ট্যাটাস" },
    { key: "time", label: "সময়" },
  ];

  const columnOverrides = {
    time: (item) => {
      if (item.time) return item.time;

      return (
        <button
          onClick={() => markAttendance(item.user_id || item.id)}
          disabled={!canMarkAttendance}
          title={attendanceWindowText}
          className={`px-3 py-1 font-semibold ${
            canMarkAttendance
              ? "underline text-orange-500"
              : "text-gray-400 cursor-not-allowed no-underline"
          }`}
        >
          Mark Attendance
        </button>
      );
    },
  };

  return (
    <div className="px-15 py-5">
      <PageHeader title="Staff Attendance" />

      {!canMarkAttendance && (
        <div className="bg-[#E8B5BA] border-l-4 border-[#ec727e] text-black font-bold p-4 rounded-lg mb-8">
          {attendanceWindowText}
        </div>
      )}

      <div className="grid grid-cols-4 gap-20 mb-8">
        {summary.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            value={item.value}
            active={filter === item.filter}
            onClick={() => setFilter(item.filter)}
          />
        ))}
      </div>
      <div className="mt-15 p-20 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.25)]">
        {loading ? (
          <div className="text-center py-10 text-gray-500 text-lg">
            Loading attendance...
          </div>
        ) : filteredStaff.length > 0 ? (
          <div>
            <TableHeader
              title="Total Staff List"
              reportingTime={reportingTime}
            />
            <Table
              items={filteredStaff}
              columns={attendanceColumns}
              tHeaders={attendanceColumns.map((c) => c.label)}
              statusStyle={{
                Present: "text-green-500",
                Late: "text-yellow-500",
                Absent: "text-red-500",
              }}
              columnOverrides={columnOverrides}
            />
          </div>
        ) : (
          <div className="text-center text-[#F54758] text-[32px] font-semibold">
            No attendance found for this status
          </div>
        )}
      </div>
    </div>
  );
};
export default AttendanceContent;
