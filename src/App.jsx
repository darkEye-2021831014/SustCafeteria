import NavBar from "./components/Header/NavBar";
import SubNavBar from "./components/SubHeader/SubNavBar";
import Attendance from "./Pages/Attendance/Attendance";
import StaffAttendence from "./Pages/Attendance/Attendance";
import AttendenceProvider from "./contexts/AttendenceContext/AttendenceContext"
function App() {
  return (
    <>
      <NavBar active="Inventory" />
      {/* <StaffAttendence /> */}
      <AttendenceProvider>
      <Attendance />
      </AttendenceProvider>
      
    </>
  );
}

export default App;
