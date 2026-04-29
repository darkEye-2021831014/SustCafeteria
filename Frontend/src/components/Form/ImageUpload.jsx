import React from "react";
import { MdOutlineFileUpload } from "react-icons/md";

const ImageUpload = ({ preview, onChange }) => {
  return (
    <label
      className="flex flex-col justify-center items-center
        w-[80px] h-[80px]
        border-2 border border-gray-300
        rounded-md cursor-pointer
        hover:border-[#F54758]/50 overflow-hidden p-2"
    >
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <span className="text-gray-500 text-xs">Upload</span>
          <MdOutlineFileUpload className="text-2xl text-gray-500" />
        </>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
};

export default ImageUpload;