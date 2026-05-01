import * as AttendanceService from "../services/attendance.js";

// ADD
export const addAttendance = async (req, res) => {
  try {
    const id = await AttendanceService.addAttendance(req.body);

    res.json({
      message: "Attendance added",
      id,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// GET ALL
export const getAllAttendance = async (req, res) => {
  try {
    let { date, status } = req.query;

    if (!date) {
      date = new Date().toISOString().split("T")[0];
    }

    const data =
      await AttendanceService.getAllAttendance(date, status);

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
// GET REPORT
export const getAttendanceReport = async (req, res) => {
  try {
    let { month, year } = req.query;

    let startDate = null;
    let endDate = null;

    if (month && year) {
      month = month.toString().padStart(2, "0");
      const lastDay = new Date(year, month, 0).getDate();

      startDate = `${year}-${month}-01`;
      endDate = `${year}-${month}-${lastDay}`;
    }

    const data = await AttendanceService.getAttendanceReport(
      startDate,
      endDate
    );

    res.json(data);
  } catch (err) {
    console.log("REPORT ERROR:", err);
    res.status(500).json({
      message: err.message,
    });
  }
};
