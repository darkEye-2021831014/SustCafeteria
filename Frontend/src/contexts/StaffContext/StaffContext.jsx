import { createContext, useEffect, useState } from "react";
import { ENV } from "../../config/env";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/Authcontext";
export const StaffContext = createContext();
const StaffProvider = ({ children }) => {
  const pillList = ["Register Staff", "Release Staff"];
  const [activeTab, setActiveTab] = useState(pillList[0]);
  const [StaffsData, setStaffsData] = useState([]);
  const onTabClick = (tab) => setActiveTab(tab);
  const { user } = useContext(AuthContext);
  // fetch staff data from backend
  const fetchStaffs = async () => {
    try {
      const res = await fetch(`${ENV.BASE_URL}/user`, {
        credentials: "include",
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to fetch staff");
      }

      const data = await res.json();
      const filteredUsers = (data.users || []).filter((u) => u.id !== user?.id);
      setStaffsData(filteredUsers);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  // add staff to backend
  const addStaff = async (formData) => {
    try {
      const res = await fetch(`${ENV.BASE_URL}/user`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed request");
      }

      // backend returns { msg, id }, so refresh list
      await fetchStaffs();
    } catch (error) {
      console.error("Error adding staff:", error);
      throw error;
    }
  };

  // delete staff from backend
  const deleteStaff = async (id) => {
    try {
      const res = await fetch(`${ENV.BASE_URL}/user/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to delete staff");
      }

      setStaffsData((prev) =>
        prev.filter((s) => s.id !== id && s.user_id !== id),
      );
    } catch (error) {
      console.error("Error deleting staff:", error);
      throw error;
    }
  };

  // load data on first render
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
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};

export default StaffProvider;
