import React from 'react'

const HeaderPill = ({ name, isActive = false }) => {
    const bg = isActive ? "bg-white rounded-lg" : "bg-none";

    return (
        <div className={`flex font-semibold text-[20px] w-auto h-auto ${bg} 
         px-3.75 py-1.5 items-center justify-center`}>
            {name}
        </div>
    )
}

export default HeaderPill
