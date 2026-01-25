import AttendanceCard from "./AttendanceCard";

import { AttendanceContext } from "./../Context/AttendanceContext/AttendanceContext";
import { useContext } from "react";
const AttendanceSummary = () => {

 const { staffList, filter, setFilter } =useContext(AttendanceContext);

  const summary = [
    { title: "Total Staff", value: staffList.length, filter: "ALL" },
    { title: "Present", value: staffList.filter(s => s.status === "Present").length, filter: "Present" },
    { title: "Late", value: staffList.filter(s => s.status === "Late").length, filter: "Late" },
    { title: "Absent", value: staffList.filter(s => s.status === "Absent").length, filter: "Absent" },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {summary.map((item, index) => (
        <AttendanceCard
          key={index}
          title={item.title}
          value={item.value}
          active={filter === item.filter}
          onClick={() => setFilter(item.filter)}
        />
      ))}
    </div>
  );
};

export default AttendanceSummary;
