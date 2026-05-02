import React from "react";

const Pill = ({ name = "All", isActive = false, onClick }) => {
  const bg = isActive ? "border border-[#8B3A3A]/60 bg-[#ffb8c0]" : "bg-none hover:bg-[#650b13]/10";

  return (
    <div
      className={`flex font-semibold text-[14px] w-auto h-auto ${bg} rounded-lg px-5 py-2 items-center justify-center cursor-pointer`}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default Pill;
