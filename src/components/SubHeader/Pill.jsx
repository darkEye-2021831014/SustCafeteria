import React from 'react'

const Pill = ({ name = "All", isActive = false,onClick }) => {
    const bg = isActive ? "bg-white rounded-lg" : "bg-none";

    return (
        <div className={`flex font-semibold text-[14px] w-auto h-auto ${bg} px-5 py-2 items-center justify-center cursor-pointer`} onClick={onClick}>
            {name}
        </div>
    )
}

export default Pill
