import express from "express";

import {
    addAttendance,
    getAllAttendance,
    getAttendanceReport
}
from "../controllers/attendance.js";

const router = express.Router();


router.post("/add", addAttendance);

router.get("/all", getAllAttendance);

router.get("/report", getAttendanceReport);
export default router;
