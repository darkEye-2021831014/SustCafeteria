import React from "react";
import Modal from "../../components/Modal/Modal";
import AddInventoryModal from "./InventoryModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaXmark } from "react-icons/fa6";

const InventoryModalManager = ({
  isOpen,
  onClose,
  isAdmin,
  activeTab,
  selectedProduct,
  isRemoveAll,
}) => {
  const modalClass = isRemoveAll
    ? "w-[630px] h-[320px]  py-[35px] bg-[#F2F2F7]"
    : activeTab === "Stock Usage"
      ? "bg-white w-[550px] h-[700px] p-[50px]"
      : isAdmin
        ? "bg-white w-[630px] h-[550px] p-[50px]"
        : "bg-white w-[550px] h-[550px] p-[50px]";
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={modalClass}>
      {!isAdmin && (
        <AddInventoryModal
          onClose={onClose}
          selectedProduct={selectedProduct}
          title="পণ্য আপডেট করুন"
        />
      )}

      {isAdmin && activeTab === "Add Item" && (
        <AddInventoryModal onClose={onClose} title="নতুন পণ্য যোগ করুন" />
      )}

      {isAdmin && activeTab === "Remove Item" && (
        <AddInventoryModal
          onClose={onClose}
          selectedProduct={selectedProduct}
          title="আপনি নিশ্চিত পণ্যটি মুছে ফেলবেন ?"
          submitIcon={<RiDeleteBin6Line />}
          cancelIcon={<FaXmark />}
          isRemoveAll={isRemoveAll}
        />
      )}
    </Modal>
  );
};

export default InventoryModalManager;
