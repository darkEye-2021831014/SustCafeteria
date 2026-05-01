import * as Attendance from "../models/attendance.js";

export const addAttendance = async (data) => {
  return await Attendance.addAttendance(data);
};

export const getAllAttendance = async (date, status) => {
  return await Attendance.getAllAttendance(date, status);
};
export const getAttendanceReport = async (startDate, endDate) => {
  return await Attendance.getAttendanceReport(startDate, endDate);
};