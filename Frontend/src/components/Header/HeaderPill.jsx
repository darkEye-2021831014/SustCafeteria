import React from "react";

const HeaderPill = ({ name, isActive = false }) => {
  const bg = isActive ? "bg-white" : "bg-none hover:bg-white/50";

  return (
    <div
      className={`flex font-semibold text-[20px] w-auto h-auto ${bg} rounded-lg px-3.75 py-1.5 items-center justify-center cursor-pointer`}
    >
      {name}
    </div>
  );
};

export default HeaderPill;
