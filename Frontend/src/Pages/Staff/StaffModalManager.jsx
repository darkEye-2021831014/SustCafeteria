import React, { useContext, useState } from "react";
import { getStaffFields, getTitle, getImageUpload } from "./StaffHelper";
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
  const { setStaffsData, addStaff, deleteStaff, deleteAll } = useContext(StaffContext);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const modalClass = isRemoveAll
    ? "w-[630px] h-[320px]  py-[35px] bg-[#F2F2F7]"
    : activeTab === "Release Staff"
  ? "bg-white w-[550px] h-[710px] p-[50px]" 
    : "bg-white w-[550px] h-[810px] p-[50px]";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Delete single staff
      if (activeTab === "Release Staff" && selectedStaff) {
        await deleteStaff(selectedStaff.id);
      }

      // Add staff
      if (activeTab === "Register Staff") {
        const formData = new FormData(e.target);
        if (imageFile) {
          formData.append("image", imageFile);
        }
        await addStaff(formData);
      }

      setPreview(null);
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleClose = () => {
    setPreview(null);
    onClose();
  };
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} className={modalClass}>
        <div className=" text-center">
          {isRemoveAll ? (
            <DeleteAll
              title="Are You Sure You Want To Release Everyone ?"
              warning="ALL STAFF IN THE STAFF TABLE WILL BE RELEASED AFTER PERFORMING THIS ACTION!!!!"
              onClose={onClose}
              deleteAll={deleteAll}
              submitText="RELEASE EVERYONE"
            ></DeleteAll>
          ) : (
            <Form
              title={getTitle(activeTab)}
              fields={fields}
              submitText={submitText}
              submitIcon={submitIcon}
              submitColor={submitColor}
              cancelColor={cancelColor}
              onSubmit={handleSubmit}
              onClose={handleClose}
              showImageUpload={getImageUpload(activeTab)}
              onImageChange={handleImage}
              preview={preview}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default StaffModalManager;
