import React from "react";
const TextIconButton = ({
  text = null,
  icon = null,
  iconRight = null,
  className = "",
  onClick = null,
  // className,
  type,
  // onClick,
}) => {
  return (
    <button
      className={`flex gap-1 justify-between px-5 py-2.5 ${className} items-center font-bold
      hover:cursor-pointer transition-colors duration-200`}
      type={type}
      onClick={onClick}
    >
      {icon != null && icon}
      {text != null && <span>{text}</span>}
      {iconRight != null && iconRight}
    </button>
  );
};

export default TextIconButton;
