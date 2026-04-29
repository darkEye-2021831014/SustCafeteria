import { createContext, useEffect, useState } from "react";

export const AttendanceContext = createContext();

const AttendanceProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [isAfter8, setIsAfter8] = useState(false);
  // state for loading
const [loading, setLoading] = useState(true);

  // Load users
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data.users) ? data.users : []))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  // Load attendance
  const loadAttendance = () => {
    const today = new Date().toISOString().split("T")[0];
    setLoading(true);

    fetch(`http://localhost:8000/attendance/all?date=${today}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.attendance)
            ? data.attendance
            : [];
        setAttendance(list);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    loadAttendance();
  }, []);

  // Live time check (for auto absent)
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const after =
        now.getHours() > 12 ||
        (now.getHours() === 12 && now.getMinutes() >= 55);
      setIsAfter8(after);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Mark attendance function
  const markAttendance = (user_id) => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;
    const today = now.toISOString().split("T")[0];

    // determine status based on time
    let status = "";
    if (hour > 12 || (hour === 12 && minute >= 55)) {
      status = "Late";
    } else {
      status = "Present";
    }

    fetch("http://localhost:8000/attendance/add", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, status, time, date: today }),
    })
      .then((res) => res.json())
      .then(() => {
        // replace or add attendance
        setAttendance((prev) => {
          const existsIndex = prev.findIndex(
            (a) => Number(a.user_id) === Number(user_id),
          );
          if (existsIndex > -1) {
            const newArr = [...prev];
            newArr[existsIndex] = { user_id, status, time, date: today };
            return newArr;
          } else {
            return [...prev, { user_id, status, time, date: today }];
          }
        });
      })
      .catch(console.log);
  };

  // Merge users + attendance
  const mergedList = users.map((u) => {
    const uid = u.user_id || u.id;
    const a = attendance.find((x) => Number(x.user_id) === Number(uid));
    console.log(`Merging user ${u.name} with attendance:`, a);

    // If attendance exists, show DB status
    if (a && a.status) return { ...u, status: a.status, time: a.time };

    // Auto absent if after 8:01 and no attendance
    if (a && isAfter8) return { ...u, status: "Absent", time: "" };

    // Before 8:01, no status
    return { ...u, status: "", time: "" };
  });
  const filteredStaff =
    filter === "ALL"
      ? mergedList.filter((s) => s.role?.toLowerCase() !== "manager")
      : mergedList
          .filter((s) => s.status === filter)
          .filter((s) => s.role?.toLowerCase() !== "manager");

  return (
    <AttendanceContext.Provider
      value={{
        loading,
        mergedList,
        filteredStaff,
        filter,
        setFilter,
        markAttendance,
        isAfter8,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceProvider;
