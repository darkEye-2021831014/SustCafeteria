import React, { useContext } from "react";
import { FaXmark } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import TextIconButton from "../../components/Button/TextIconButton";
import { SupplierContext } from "../../contexts/SupplierContext/SupplierContext";

const RemoveAllSupplierModal = ({ onClose }) => {
    const {setSuppliersData} = useContext(SupplierContext);
  return (
    <div>
      <h1 className="text-red-500 text-2xl mb-10">Are You Sure You Want To Release Everyone?</h1>
      
        <div className="flex justify-between items-center gap-10 mt-1 px-20 mb-10 ">
          <p className="text-red-500  text-[24px]">Warning</p>
          <p className="text-[#FF8D28] text-[20px] text-start">
            ALL SUPPLIER IN THE SUPPLIER TABLE WILL BE RELEASED AFTER PERFORMING
            THIS ACTION!!!!
          </p>
        </div>
        <div className="flex justify-center items-center gap-25 mt-1 px-20 ">
        <TextIconButton
          text="Cancel"
          icon={<FaXmark />}
          className="w-[98px] h-[40px] bg-[#34C759] text-white rounded-full font-bold text-[12px]"
          type="button"
          onClick={onClose}
        />

        <TextIconButton
          text="RELEASE EVERYONE"
          icon={<RiDeleteBin6Line />}
          className="w-[170px] h-[40px] bg-[#D83438] text-black rounded-full font-bold text-[12px]"
          type="submit"
          onClick={() => {
            setSuppliersData([]);
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default RemoveAllSupplierModal;
