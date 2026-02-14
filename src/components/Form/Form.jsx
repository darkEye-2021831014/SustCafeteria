import React from "react";
import TextIconButton from "../Button/TextIconButton";
import { FaCheck, FaXmark } from "react-icons/fa6";

const Form = ({
  title,
  fields = [],
  onSubmit,
  onClose,
  submitText = "Submit",
  cancelText = "Cancel",
}) => {
  return (
    <div>
      <h1 className="text-[22px] font-semibold text-[#F54758] text-center mb-6">
        {title}
      </h1>
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
            icon={<FaXmark />}
            className="w-[98px] h-[32px] bg-red-500 text-white rounded-full font-bold text-[12px]"
            type="button"
            onClick={onClose}
          />

          <TextIconButton
            text={submitText}
            icon={<FaCheck />}
            className="w-[98px] h-[32px] bg-[#34C759] text-white rounded-full font-bold text-[12px]"
            type="submit"
            // onClick={onClose}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
