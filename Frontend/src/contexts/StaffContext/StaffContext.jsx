import { createContext, useEffect, useState } from "react";

export const StaffContext = createContext();
const BASE_URL = "http://localhost:8000";
const StaffProvider = ({ children }) => {
  const pillList = ["Register Staff", "Release Staff"];
  const [activeTab, setActiveTab] = useState(pillList[0]);

  const onTabClick = (tab) => setActiveTab(tab);
  const [StaffsData, setStaffsData] = useState([]);
  const fetchStaffs = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user`, {
        credentials: "include",
      });
      const data = await res.json();
      setStaffsData(data.staffs);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  // 🔽 load data on first render
  useEffect(() => {
    fetchStaffs();
  }, []);
console.log("Staff added",StaffsData)
  return (
    <StaffContext.Provider
      value={{
        pillList,
        activeTab,
        onTabClick,
        StaffsData,
        setStaffsData,
        fetchStaffs

      }}
    >
      {children}
    </StaffContext.Provider>
  );
};

export default StaffProvider;
