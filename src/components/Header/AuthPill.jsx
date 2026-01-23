import React, { use } from 'react'
import HeaderPill from './HeaderPill'
import profilePicture from '../../assets/profilePicture.png'
import { AuthContext } from '../../Context/AuthContext/AuthContext'

const AuthPill = ({ signedIn = false, isActive = false }) => {
    const {user,signOutUser} =use(AuthContext);
    const handleSignOut=()=>{
    signOutUser()
    .then(()=>{})
    .catch(err=>console.log(err));
  }
    const bg = isActive ? "bg-white rounded-lg py-2" : "bg-none";

    return (
        user ?
            <div className={`w-auto h-auto px-3.75 ${bg}`} onClick={handleSignOut}>
                <img src={profilePicture} alt="Profile Image" className="w-10 h-10 rounded-full object-cover" />
            </div> :
            <HeaderPill name="Sign In" isActive={true} />
    )
}

export default AuthPill
