import React from "react";
import Pill from "./Pill";

const SubNavBar = ({
  pillList = ["All", "Breakfast", "Lunch", "Miscellaneous"],
  active = "All",
  className = "",
}) => {
  const subTabs = pillList.map((pill) => {
    return <Pill key={pill} name={pill} isActive={active === pill} />;
  });
  return (
    <div
      className={`flex bg-[#E8B5BA]/50  h-14 w-full items-center justify-start gap-10 px-5 py-3 ${className}`}
    >
      {subTabs}
    </div>
  );
};

export default SubNavBar;
