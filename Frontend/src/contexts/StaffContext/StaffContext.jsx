import { createContext, useEffect, useState } from "react";

export const StaffContext = createContext();
const BASE_URL = "http://localhost:8000";
const StaffProvider = ({ children }) => {
  const pillList = ["Register Staff", "Release Staff"];
  const [activeTab, setActiveTab] = useState(pillList[0]);

  const onTabClick = (tab) => setActiveTab(tab);
  const [StaffsData, setStaffsData] = useState([]);

  // fetch staff data from backend
  const fetchStaffs = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user`, {
        credentials: "include",
      });
      const data = await res.json();
      const filteredUsers = data.users.filter((u) => u.role !== "ADMIN");

      setStaffsData(filteredUsers);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

// add staff to backend
  const addStaff = async (formData) => {
    try {
      console.log("FormData:", [...formData.entries()]);

      const res = await fetch(`${BASE_URL}/user`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const text = await res.text();
      console.log("Server response:", text);

      if (!res.ok) throw new Error("Failed request");

      const data = JSON.parse(text);

      setStaffsData((prev) => [...prev, data.user]);
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  };

// delete staff from backend
  const deleteStaff = async (id) => {
  try {
    await fetch(`${BASE_URL}/user/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setStaffsData((prev) => prev.filter((s) => s.id !== id));

  } catch (error) {
    console.error("Error deleting staff:", error);
  }
};

// delete all staff from backend
// const deleteAll = async () => {
//   await fetch(`${BASE_URL}/user`, {
//     method: "DELETE",
//     credentials: "include",
//   });

//   setStaffsData([]);
// };

  //load data on first render
  useEffect(() => {
    fetchStaffs();
  }, []);
  return (
    <StaffContext.Provider
      value={{
        pillList,
        activeTab,
        onTabClick,
        StaffsData,
        setStaffsData,
        addStaff,
        deleteStaff,
        // deleteAll,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};

export default StaffProvider;
