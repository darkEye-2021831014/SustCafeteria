import React from 'react'
import PillList from './PillList';
import AuthPill from './AuthPill';
import sustLogo from '../../assets/sustLogo.png'

const NavBar = ({ active = "Home", isAdmin = false, signedIn = true }) => {

    const headerPillList = isAdmin ?
        ["Home", "Menu", "Inventory", "Staff", "Supplier", "Report"] :
        ["Home", "Menu", "Inventory", "Attendance", "Supplier"];

    return (
        <div className='flex bg-[#E8B5BA] h-20 w-full
        items-center justify-between px-5 py-3'>

            <div className='flex items-center gap-4'>
                <img src={sustLogo} alt="sustLogo"
                    className='w-auto h-14' />
                <div className='font-tourney text-[30px]'>Sust Cafeteria</div>
            </div>

            <div className='flex gap-12'>
                <PillList headerPillList={headerPillList} active={active} />
                <AuthPill signedIn={signedIn} isActive={active === "Profile"} />
            </div>
        </div>

    )

}

export default NavBar
