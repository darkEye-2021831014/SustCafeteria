import React from "react";
import { Link } from "react-router";

const HeaderPill = ({
  name,
  isActive = false,
  onClick,
  /** When false, use button + onClick so logged-out users never hit protected URLs via Link */
  linkMode = true,
}) => {
  const bg = isActive ? "bg-white text-black" : "bg-none hover:bg-white/50";
  console.log("Rendering HeaderPill:", { name, isActive, linkMode });
  const getPath = (n) => {
    switch (n) {
      case "Home":
        return "/";
      case "Attendance":
        return "/attendance";
      case "Menu":
        return "/menu";
      case "Inventory":
        return "/inventory";
      case "Supplier":
        return "/supplier";
      case "Staff":
        return "/staff";
      case "Report":
        return "/report";
      case "Profile":
        return "/profile";
      default:
        return "/";
    }
  };

  const inner = (
    <div
      className={`flex font-semibold text-[20px] w-auto h-auto ${bg} rounded-lg px-3.75 py-1.5 items-center justify-center cursor-pointer`}
    >
      {name}
    </div>
  );

  if (linkMode) {
    return <Link to={getPath(name)}>{inner}</Link>;
  }

  return (
    <button
      type="button"
      className="cursor-pointer border-0 bg-transparent p-0 font-inherit"
      onClick={onClick}
    >
      {inner}
    </button>
  );
};

export default HeaderPill;
