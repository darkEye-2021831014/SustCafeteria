import React, { useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { ENV } from "../../config/env";
import { StaffContext } from "../../contexts/StaffContext/StaffContext";

const StaffDetailsModal = ({ isOpen, onClose, staff }) => {
  const { updateStaffRole } = useContext(StaffContext);

  const [selectedRole, setSelectedRole] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setSelectedRole(staff?.role || "");
    setErrorMsg("");
  }, [staff]);

  if (!staff) return null;

  const API_BASE = ENV.BASE_URL;
  const imageSrc = staff.image
    ? staff.image.startsWith("http")
      ? staff.image
      : `${API_BASE}/${staff.image}`
    : null;

  const handleSaveRole = async () => {
    if (!selectedRole) {
      setErrorMsg("Please select a role.");
      return;
    }

    if (selectedRole === staff.role) {
      onClose();
      return;
    }

    try {
      setIsSaving(true);
      setErrorMsg("");
      await updateStaffRole(staff.id, selectedRole);
      onClose();
    } catch (error) {
      setErrorMsg("Failed to update role.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-[900px] h-[460px] rounded-3xl overflow-hidden bg-[#650b13]"
    >
      <div className="grid grid-cols-2 h-full">
        {/* LEFT SIDE */}
        <div className="relative flex items-center justify-center bg-[#650b13] text-white">
          <div className="text-center">
            <div className="w-44 h-44 mx-auto rounded-full border-4 border-white shadow-lg overflow-hidden bg-white/20">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={staff.name || "Staff profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm px-4">
                  No Profile Image
                </div>
              )}
            </div>

            <h2 className="mt-6 text-3xl font-bold">
              {staff.name || "Unknown Staff"}
            </h2>
            <p className="mt-2 text-white/90 text-lg">{staff.role || "No Role"}</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white h-full p-8 flex flex-col">
          <h3 className="text-2xl font-bold text-[#650b13] mb-6">Staff Details</h3>

          <div className="space-y-4 text-[16px] text-gray-800">
            <div className="grid grid-cols-[130px_1fr]">
              <span className="font-semibold">Name</span>
              <span>: {staff.name || "-"}</span>
            </div>

            <div className="grid grid-cols-[130px_1fr]">
              <span className="font-semibold">Email</span>
              <span>: {staff.email || "-"}</span>
            </div>

            <div className="grid grid-cols-[130px_1fr]">
              <span className="font-semibold">Contact</span>
              <span>: {staff.contact || "-"}</span>
            </div>

            <div className="grid grid-cols-[130px_1fr] items-center">
              <span className="font-semibold">Role</span>
              <div className="flex items-center gap-2">
                <span>:</span>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#650b13]/30"
                >
                  <option value="">Select role</option>
                  <option value="manager">manager</option>
                  <option value="staff">cashier</option>
                  <option value="normal">chef</option>
                  <option value="admin">assistant chef</option>
                  <option value="admin">porota maker</option>
                  <option value="admin">assistant porota maker</option>
                  <option value="admin">waiter</option>
                  <option value="admin">dish washer</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-[130px_1fr]">
              <span className="font-semibold">Address</span>
              <span>: {staff.address || "-"}</span>
            </div>

            <div className="grid grid-cols-[130px_1fr]">
              <span className="font-semibold">Join Date</span>
              <span>
                : {staff.join_date ? String(staff.join_date).slice(0, 10) : "-"}
              </span>
            </div>
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm mt-4">{errorMsg}</p>
          )}

          <div className="mt-auto flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveRole}
              disabled={isSaving}
              className="px-6 py-2 rounded-lg bg-[#650b13] text-white font-semibold hover:bg-[#6f2e2e] transition-colors disabled:opacity-60 cursor-pointer"
            >
              {isSaving ? "Saving..." : "Save Role"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StaffDetailsModal;