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
    : "bg-white w-[550px] h-[608px] p-[50px]";
  return (

    <Modal isOpen={isOpen} onClose={onClose} className={modalClass}> 

      {!isAdmin && (

        <AddInventoryModal
          onClose={onClose}
          selectedProduct={selectedProduct}
        />

      )}

      {isAdmin && activeTab === "Add Item" && (

        <AddInventoryModal
          onClose={onClose}
          title="নতুন পণ্য যোগ করুন"
        />

      )}

      {isAdmin && activeTab === "Remove Item" && (

        <AddInventoryModal
          onClose={onClose}
          selectedProduct={selectedProduct}
          submitIcon={<RiDeleteBin6Line />}
          cancelIcon={<FaXmark />}
          isRemoveAll={isRemoveAll}
        />

      )}

    </Modal>

  );

};

export default InventoryModalManager;
