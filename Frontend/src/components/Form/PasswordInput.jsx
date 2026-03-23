import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ field }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={field.name}
        placeholder={field.placeholder}
        defaultValue={field.defaultValue || ""}
        disabled={field.disabled}
        className={`px-[14px] py-[10px] rounded-md border border-gray-300 w-full
          ${field.disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          focus:outline-none focus:ring-2 focus:ring-[#F54758]/50`}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
