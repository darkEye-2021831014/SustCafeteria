import React, { useContext } from "react";
import TextIconButton from "../Button/TextIconButton";
import { FaCheck, FaXmark } from "react-icons/fa6";
import ImageUpload from "./ImageUpload";
const Form = ({
  title,
  fields = [],
  onSubmit,
  onClose,
  submitText = "Submit",
  cancelText = "Cancel",
  submitIcon,
  cancelIcon,
  submitColor = "bg-green-500",
  cancelColor = "bg-red-500",
  showImageUpload = false,
  onImageChange,
  preview,
}) => {
  return (
    <div>
      <div
        className={`grid items-center  ${showImageUpload ? "grid-cols-3 mb-2" : "grid-cols-1 mb-6"}`}
      >
        <div></div>
        <h1
          className="font-bold text-[#F54758]"
          style={{
            gridColumn: showImageUpload ? "1 / span 2" : "1 / -1",
            fontSize: "24px",
            marginLeft: showImageUpload ? "90px" : "0px",
          }}
        >
          {title}
        </h1>

        {/* image upload */}
        {showImageUpload && (
          <div className="flex justify-end">
            <ImageUpload preview={preview} onChange={onImageChange} />
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col gap-1">
            <label className="text-sm font-medium text-start">
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                className="px-[14px] py-[10px] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F54758]/50"
              >
                <option value="" disabled>
                  -- Select --
                </option>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder}
                defaultValue={field.defaultValue || ""}
                disabled={field.disabled}
                className={`px-[14px] py-[10px] rounded-md border border-gray-300
    ${field.disabled ? "bg-gray-100 cursor-not-allowed" : ""}
    focus:outline-none focus:ring-2 focus:ring-[#F54758]/50`}
              />
            )}
          </div>
        ))}

        <div className="flex justify-center items-center gap-10 mt-1 px-20 ">
          <TextIconButton
            text={cancelText}
            icon={cancelIcon || <FaXmark />}
            className={`w-[98px] h-[32px] ${cancelColor} text-white rounded-full font-bold text-[12px]`}
            type="button"
            onClick={onClose}
          />

          <TextIconButton
            text={submitText}
            icon={submitIcon || <FaCheck />}
            className={`w-[98px] h-[32px] ${submitColor} text-white rounded-full font-bold text-[12px]`}
            type="submit"
            // onClick={onClose}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
