import express from "express";

import {
    addAttendance,
    getAllAttendance
}
from "../controllers/attendance.js";

const router = express.Router();


router.post("/add", addAttendance);

router.get("/all", getAllAttendance);


export default router;
