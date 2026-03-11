import React from 'react';
import NavBar from '../../components/Header/NavBar';
import SubNavBar from '../../components/SubHeader/SubNavBar';
import StaffProvider from '../../contexts/StaffContext/StaffContext';
import StaffContent from './StaffContent';

const Staff = () => {
    return (
        <div>
            <NavBar active='Staff' isAdmin='true'></NavBar>
            <StaffProvider>
                <StaffContent/>
            </StaffProvider>
        </div>
    );
};

export default Staff;