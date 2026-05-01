import { set } from "date-fns";
import {
  createContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router";
export const ReportContext = createContext();

const ReportProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] =useState(new Date());
  const pillList = ["Sales Report","Inventory Report","Attendance Report"];

  const [activeTab, setActiveTab] =useState(pillList[0]);
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

  // useEffect(() => {
  //   const month = String(
  //     selectedDate.getMonth() + 1
  //   ).padStart(2, "0");

  //   const year = selectedDate.getFullYear();
    

  //  fetch(
  //   `${import.meta.env.VITE_API_BASE_URL}/attendance/report?month=${month}&year=${year}`,
  //   {
  //     credentials: "include",
  //   }
  // )
  //   .then((res) => res.json())
  //   .then((data) => {
  //     const filteredData = data.filter(
  //       (item) => item.position.toLowerCase() !== "manager"
  //     );
  //     setAttendance(filteredData);
  //   });
  // }, [selectedDate]);

  useEffect(() => {
    setLoading(true);
  const month = String(
    selectedDate.getMonth() + 1
  ).padStart(2, "0");

  const year = selectedDate.getFullYear();

  let url = "";

  if (activeTab === "Attendance Report") {
    url = `${import.meta.env.VITE_API_BASE_URL}/attendance/report?month=${month}&year=${year}`;
  } 
  // else if (activeTab === "Sales Report") {
  //   url = `${import.meta.env.VITE_API_BASE_URL}/sales/report?month=${month}&year=${year}`;
  // } 
  // else if (activeTab === "Inventory Report") {
  //   url = `${import.meta.env.VITE_API_BASE_URL}/inventory/report?month=${month}&year=${year}`;
  // }

  if (!url) return;
  
  fetch(url, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (activeTab === "Attendance Report") {
        const filteredData = data.filter(
          (item) =>
            item.position.toLowerCase() !== "manager"
        );
        setAttendance(filteredData);
      } else {
        setAttendance(data);
      }
    }).catch((err) => console.error(err))
    .finally(() => setLoading(false)); 
}, [selectedDate, activeTab]);
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
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export default ReportProvider;
