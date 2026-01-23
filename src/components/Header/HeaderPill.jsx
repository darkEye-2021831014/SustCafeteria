import React from "react";
import { NavLink } from "react-router";

const HeaderPill = ({ name, isActive = false }) => {
  const bg = isActive ? "bg-white rounded-lg" : "bg-none";
     const route =
  name.toLowerCase() === "home"
    ? "/"
    : name.toLowerCase() === "signin" || name.toLowerCase() === "sign in"
    ? "/login"
    : `/${name.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div
      className={`flex font-semibold text-[20px] w-auto h-auto ${bg} 
         px-3.75 py-1.5 items-center justify-center`}
    >
      <NavLink
        to={route}
      >
        {name}
      </NavLink>
    </div>
  );
};

export default HeaderPill;
