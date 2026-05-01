import {
  createContext,
  useEffect,
  useState,
} from "react";

export const ReportContext = createContext();

const ReportProvider = ({ children }) => {
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const pillList = [
    "Sales Report",
    "Inventory Report",
    "Attendance Report",
  ];

  const [activeTab, setActiveTab] =
    useState("Attendance Report");

  const onTabClick = (tab) => setActiveTab(tab);

  useEffect(() => {
    const month = String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0");

    const year = selectedDate.getFullYear();

   fetch(
    `${import.meta.env.VITE_API_BASE_URL}/attendance/report?month=${month}&year=${year}`,
    {
      credentials: "include",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const filteredData = data.filter(
        (item) => item.position.toLowerCase() !== "manager"
      );
      setAttendance(filteredData);
    });
  }, [selectedDate]);
  

  return (
    <ReportContext.Provider
      value={{
        attendance,
        selectedDate,
        setSelectedDate,
        activeTab,
        onTabClick,
        pillList,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export default ReportProvider;
