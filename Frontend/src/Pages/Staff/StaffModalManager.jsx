import React, { useContext } from "react";
import { getStaffFields } from "./StaffHelper";
import Form from "../../components/Form/Form";
import Modal from "../../components/Modal/Modal";
import DeleteAll from "../../components/Modal/DeleteAll";
import { StaffContext } from "../../contexts/StaffContext/StaffContext";

const StaffModalManager = ({
  isOpen,
  onClose,
  activeTab,
  selectedStaff,
  isRemoveAll,
  submitText,
  submitColor,
  submitIcon,
  cancelColor,
}) => {
  const fields = getStaffFields(selectedStaff, activeTab);
  const { setStaffsData } = useContext(StaffContext);
  const modalClass = isRemoveAll
    ? "w-[630px] h-[320px]  py-[35px] bg-[#F2F2F7]"
    : "bg-white w-[550px] h-[700px] p-[50px]";
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (selectedStaff) {
      setStaffsData((prev) =>
        prev.filter((man) => man.name !== selectedStaff.name),
      );
    } else {
      setStaffsData((prev) => [...prev, data]);
    }

    onClose();
  };
  console.log("selected staff", selectedStaff);
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} className={modalClass}>
        <div className=" text-center">
          {isRemoveAll ? (
            <DeleteAll
              title="Are You Sure You Want To Release Everyone ?"
              warning="ALL STAFF IN THE STAFF TABLE WILL BE RELEASED AFTER PERFORMING THIS ACTION!!!!"
              onClose={onClose}
              setData={setStaffsData}
              submitText="RELEASE EVERYONE"
            ></DeleteAll>
          ) : (
            <Form
              title="Register New Staff"
              fields={fields}
              submitText={submitText}
              submitIcon={submitIcon}
              submitColor={submitColor}
              cancelColor={cancelColor}
              onSubmit={handleSubmit}
              onClose={onClose}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default StaffModalManager;
