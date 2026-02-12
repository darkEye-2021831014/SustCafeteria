import React from "react";

const TextIconButton = ({
  text = null,
  icon = null,
  iconRight = null,
  className = "",
  onClick = null,
}) => {
  return (
    <button
      className={`flex gap-1 justify-between px-5 py-2.5 ${className} items-center text-white font-bold
      hover:cursor-pointer transition-colors duration-200`}
      onClick={onClick}
    >
      {icon != null && icon}
      {text != null && <span>{text}</span>}
      {iconRight != null && iconRight}
    </button>
  );
};

export default TextIconButton;
