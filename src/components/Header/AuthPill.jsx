import React from 'react'
import HeaderPill from './HeaderPill'
import profilePicture from '../../assets/profilePicture.png'

const AuthPill = ({ signedIn = true, isActive = false }) => {
    const bg = isActive ? "bg-white rounded-lg py-2" : "bg-none";

    return (
        signedIn ?
            <div className={`w-auto h-auto px-3.75 ${bg}`}>
                <img src={profilePicture} alt="Profile Image" className="w-10 h-10 rounded-full object-cover" />
            </div> :
            <HeaderPill name="Sign In" isActive={true} />
    )
}

export default AuthPill
