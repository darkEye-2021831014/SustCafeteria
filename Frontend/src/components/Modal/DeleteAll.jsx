import React from 'react';
import { FaXmark } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import TextIconButton from '../Button/TextIconButton';
const DeleteAll = ({title,warning,onClose,deleteAll,submitText="RELEASE EVERYONE"}) => {
   
  return (
    <div>
      <h1 className="text-red-500 text-2xl mb-10">{title}</h1>
      
        <div className="flex justify-between items-center gap-10 mt-1 px-20 mb-10 ">
          <p className="text-red-500  text-[24px]">Warning</p>
          <p className="text-[#FF8D28] text-[20px] text-start">
            {warning}
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
          text={submitText}
          icon={<RiDeleteBin6Line />}
          className="w-[170px] h-[40px] bg-[#D83438] text-black rounded-full font-bold text-[12px]"
          type="submit"
          onClick={async () => {
            await deleteAll();
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default DeleteAll;