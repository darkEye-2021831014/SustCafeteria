import React from "react";

const Card = ({ title, value, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.25)] cursor-pointer transition
        ${active ? "bg-[#F54758]/70" : "bg-[#F54758]/10 hover:bg-[#F54758]/35"} text-center`}
    >
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default Card;
