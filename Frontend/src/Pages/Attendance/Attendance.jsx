import React from 'react';
import NavBar from '../../components/Header/NavBar';
import AttendanceProvider from '../../contexts/AttendanceContext/AttendanceContext';
import AttendanceContent from './AttendanceContent';

const Attendance = () => {
    return (
        <div>
            {/* <NavBar active="Attendance" isAdmin={false} /> */}
            <AttendanceProvider>
                <AttendanceContent />
            </AttendanceProvider>
        </div>
    );
};

export default Attendance;