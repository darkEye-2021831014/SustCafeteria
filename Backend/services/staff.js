import * as Staff from "../models/staff.js";

export const addStaff = async (staff) => {
  const staffId = await Staff.addStaff(staff);
  return staffId;
};

export const getStaffById = async (id) => {
  return await Staff.getStaffById(id);
};

export const getAllStaff = async () => {
  return await Staff.getAllStaff();
};

export const deleteStaff = async (id) => {
  return await Staff.deleteStaff(id);
};

export const deleteAllStaff = async () => {
  return await Staff.deleteAllStaff();
};
