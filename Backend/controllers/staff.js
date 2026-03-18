import * as StaffService from "../services/staff.js";

export const createStaff = async (req, res) => {
  try {
    const staffData = {
      ...req.body,
      image: req.file ? req.file.filename : null,
    };

    const result = await StaffService.addStaff(staffData);

    res.status(201).json({
      message: "Staff created successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getStaff = async (req, res) => {
  try {
    const staff = await StaffService.getStaffById(req.params.id);

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    res.json(staff);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getAllStaff = async (req, res) => {
  const staffs = await StaffService.getAllStaff();
  res.json({ staffs });
};

import fs from "fs";
import path from "path";

export const deleteStaff = async (req, res) => {
  try {
    const id = req.params.id;

    // 🔹 first get staff
    const staff = await StaffService.getStaffById(id);

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    // 🔹 delete image
    if (staff.image) {
      const imagePath = path.join(process.cwd(), "uploads", staff.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // 🔹 delete from DB
    await StaffService.deleteStaff(id);

    res.json({
      message: "Staff deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
export const deleteAllStaff = async (req, res) => {
  try {
    const staffs = await StaffService.getAllStaff();

    for (const s of staffs) {
      if (s.image) {
        const imagePath = path.join(process.cwd(), "uploads", s.image);

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    }

    await StaffService.deleteAllStaff();

    res.json({
      message: "All staff deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
