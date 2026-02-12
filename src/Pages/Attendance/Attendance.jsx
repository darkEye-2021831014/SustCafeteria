import React, { useContext } from "react";
import PageHeader from "../../components/Table/PageHeader";
import { AttendanceContext } from "../../contexts/AttendenceContext/AttendenceContext";
import AttendenceProvider from "../../contexts/AttendenceContext/AttendenceContext";
import Card from "../../components/Table/Card";
import TableHeader from "../../components/Table/TableHeader";
import Table from "../../components/Table/Table";
const Attendence = () => {
  const reportingTime = "সকাল ৮:০০ টা";
  const { staffList, filter, setFilter,filteredStaff } = useContext(AttendanceContext);
  const summary = [
    { title: "Total Staff", value: staffList.length, filter: "ALL" },
    {
      title: "Present",
      value: staffList.filter((s) => s.status === "Present").length,
      filter: "Present",
    },
    {
      title: "Late",
      value: staffList.filter((s) => s.status === "Late").length,
      filter: "Late",
    },
    {
      title: "Absent",
      value: staffList.filter((s) => s.status === "Absent").length,
      filter: "Absent",
    },
  ];
  const attendanceColumns = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status", type: "status" },
  { key: "time", label: "Time" },
];

  return (
    <div className="px-15 py-5">
      <PageHeader title="Staff Attendance"></PageHeader>
      <div>
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
          <TableHeader
            title="Total Staff List"
            reportingTime={reportingTime}
          />
          <Table items={filteredStaff} columns={attendanceColumns} tHeaders={attendanceColumns.map(c => c.label)} statusStyle={{ Present: "text-green-500", Late: "text-yellow-500", Absent: "text-red-500" }} />

          </div>
        </div>
      
    </div>
  );
};

export default Attendence;
