import { useContext } from "react";
import { AttendanceContext } from "../contexts/AttendanceContext/AttendanceContext";


export const useAttendance = () => {
    console.log("useAttendance hook called");
  return useContext(AttendanceContext);
};