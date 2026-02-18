import { createContext, useEffect, useState } from "react";

export const StaffContext = createContext();

const StaffProvider = ({ children }) => {
  const pillList = ["Register Staff", "Release Staff"];
  const [activeTab, setActiveTab] = useState(pillList[0]);

  const onTabClick = (tab) => setActiveTab(tab);

  const [StaffsData, setStaffsData] = useState(() => {
    const stored = localStorage.getItem("StaffsData");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem("StaffsData", JSON.stringify(StaffsData));
  }, [StaffsData]);
console.log("Staff added",StaffsData)
  return (
    <StaffContext.Provider
      value={{
        pillList,
        activeTab,
        onTabClick,
        StaffsData,
        setStaffsData,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};

export default StaffProvider;
