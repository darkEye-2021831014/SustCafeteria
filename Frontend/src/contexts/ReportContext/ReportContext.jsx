import { set } from "date-fns";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
export const ReportContext = createContext();
import { ENV } from "../../config/env";
const ReportProvider = ({ children }) => {
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const pillList = ["Sales Report", "Inventory Report", "Attendance Report"];
  const [activeTab, setActiveTab] = useState(pillList[0]);
  const onTabClick = (tab) => {
    if (tab === "Sales Report") {
      navigate("/report/sales-report");
    } else if (tab === "Inventory Report") {
      navigate("/report/inventory-report");
    } else if (tab === "Attendance Report") {
      navigate("/report/attendance-report");
    } else {
      navigate("/report");
    }
  };


  useEffect(() => {
    setLoading(true);
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");

    const year = selectedDate.getFullYear();

    let url = "";
    if (activeTab === "Attendance Report") {
      url = `${ENV.BASE_URL}/attendance/report?month=${month}&year=${year}`;
    } else if (activeTab === "Inventory Report") {
      if (!startDate || !endDate) return;

      url = `${ENV.BASE_URL}/usage/history?startDate=${startDate}&endDate=${endDate}`;
    } else {
      url = `${ENV.BASE_URL}/sales?startDate=${startDate}&endDate=${endDate}`;
    }

    if (!url) return;

    fetch(url, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (activeTab === "Attendance Report") {
          const filteredData = data.filter(
            (item) => item.position.toLowerCase() !== "manager",
          );
          setAttendance(filteredData);
        } else if (activeTab === "Inventory Report") {
          setAttendance(data);
        } else {
          setAttendance(Array.isArray(data?.data) ? data.data : []);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedDate, activeTab, startDate, endDate]);
  return (
    <ReportContext.Provider
      value={{
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
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export default ReportProvider;
