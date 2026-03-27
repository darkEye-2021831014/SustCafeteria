import React from "react";
import { Link } from "react-router";
const HeaderPill = ({ name, isActive = false }) => {
  const bg = isActive ? "bg-white" : "bg-none hover:bg-white/50";
  const getPath = (name) => {
    switch (name) {
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
      default:
        return "/";
    }
  };

  return (
    <Link to={getPath(name)}>
      <div
        className={`flex font-semibold text-[20px] w-auto h-auto ${bg} rounded-lg px-3.75 py-1.5 items-center justify-center cursor-pointer`}
      >
        {name}
      </div>
    </Link>
  );
};
export default HeaderPill;