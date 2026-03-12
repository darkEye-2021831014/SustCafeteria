import React, { useContext, useState } from "react";
import { getStaffFields,getTitle ,getImageUpload} from "./StaffHelper";
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
  const [preview, setPreview] = useState(null);

  const modalClass = isRemoveAll
    ? "w-[630px] h-[320px]  py-[35px] bg-[#F2F2F7]"
    : "bg-white w-[550px] h-[730px] p-[50px]";
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
    setPreview(null);
    onClose();
  };
  const handleClose = () => {
    setPreview(null);
    onClose();
  };
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
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
              warning="ALL STAFF IN THE STAFF TAVLE WILL BE RELEASED AFTER PERFORMING THIS ACTION!!!!"
              onClose={onClose}
              setData={setStaffsData}
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
