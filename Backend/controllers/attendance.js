import * as AttendanceService from "../services/attendance.js";

export const addAttendance = async (req, res) => {
    try {
        const id = await AttendanceService.addAttendance(req.body);

        res.json({
            message: "Attendance added",
            id
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

export const getAllAttendance = async (req, res) => {
    try {

        let { date, status } = req.query;

        if (!date) {
            date = new Date().toISOString().split("T")[0];
        }

        console.log("DATE =", date);
        console.log("STATUS =", status);

        const data =
            await AttendanceService.getAllAttendance(date, status);

        res.json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};