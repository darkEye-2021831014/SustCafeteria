import React from "react";

const Pill = ({ name = "All", isActive = false, onClick }) => {
  const bg = isActive ? "bg-white " : "bg-none hover:bg-white/50";

  return (
    <div
      className={`flex font-semibold text-[14px] w-auto h-auto ${bg} px-5 py-2 items-center justify-center cursor-pointer   transition duration-300 ease-in-out rounded-lg`}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default Pill;
