import React from 'react'
import HeaderPill from './HeaderPill'

const PillList = ({ headerPillList, active }) => {

    const TabButtons = headerPillList.map((pill) => {
        return <HeaderPill key={pill} name={pill} isActive={pill === active} />
    });

    return (
        <div className='grid grid-flow-col auto-cols-max gap-4 justify-end'>
            {TabButtons}
        </div>
    )
}

export default PillList
