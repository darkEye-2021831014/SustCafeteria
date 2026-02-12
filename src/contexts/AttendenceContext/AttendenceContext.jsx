import { createContext, useState } from "react";

export const AttendanceContext = createContext();

const AttendanceProvider = ({ children }) => {
  const staffList = [
    { name: "আব্দুল আজাদ", role: "সহকারী ব্যবস্থাপক", status: "Absent", time: "-" },
    { name: "ফয়সাল আলম", role: "সহকারী ব্যবস্থাপক", status: "Present", time: "08:00" },
    { name: "নজরুল ইসলাম", role: "প্রধান বাবুর্চি", status: "Late", time: "08:30" },
    { name: "সাইফুল ইসলাম", role: "সহকারী বাবুর্চি", status: "Present", time: "07:55" },
    { name: "রাশেদ মাহমুদ", role: "ক্লিনার", status: "Absent", time: "-" },
    { name: "মোস্তাফিজুর রহমান", role: "সিনিয়র ক্লিনার", status: "Late", time: "08:20" },
    { name: "হাসান মাহমুদ", role: "ক্যাশিয়ার", status: "Present", time: "07:50" },
    { name: "তানভীর আহমেদ", role: "সহকারী ক্যাশিয়ার", status: "Absent", time: "-" },
  ];

  const [filter, setFilter] = useState("ALL");

  const filteredStaff =
    filter === "ALL"
      ? staffList
      : staffList.filter((s) => s.status === filter);

  return (
    <AttendanceContext.Provider
      value={{
        staffList,
        filteredStaff,
        filter,
        setFilter,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceProvider;