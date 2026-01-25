import React from "react";
import AttendancePageHeader from "../../components/Attendance/AttendancePageHeader";
import AttendanceSummary from "../../components/Attendance/AttendanceSummary";
import AttendanceTableHeader from "../../components/Attendance/AttendanceTableHeader";
import AttendanceTable from "../../components/Attendance/AttendanceTable";
import AttendanceProvider from "../../components/Context/AttendanceContext/AttendanceContext";
const Attendance = () => {

  const reportingTime = "সকাল ৮:০০ টা";
  return (
    <div className="px-15 py-5">
      <AttendancePageHeader title="Staff Attendance"></AttendancePageHeader>
      <AttendanceProvider>
        <AttendanceSummary/>

        <div className="mt-8 bg-[#E8B5BA]/20 p-10 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.25)]">
          <AttendanceTableHeader
            title="Total Staff List"
            reportingTime={reportingTime}
          />
          <AttendanceTable></AttendanceTable>
        </div>
      </AttendanceProvider>
    </div>
  );
};

export default Attendance;
