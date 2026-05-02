import React from "react";
import HeaderPill from "./HeaderPill";

const PillList = ({ headerPillList, active,onItemClick  }) => {
  const TabButtons = headerPillList.map((pill) => {
    return <HeaderPill key={pill} name={pill} isActive={pill === active} onClick={() => onItemClick(pill)}/>;
  });

  return (
    <div className="grid grid-flow-col auto-cols-max gap-4 justify-end h-fit">
      {TabButtons}
    </div>
  );
};

export default PillList;

