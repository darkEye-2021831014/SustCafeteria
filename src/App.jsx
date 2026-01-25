import NavBar from "./components/Header/NavBar"
import SubNavBar from "./components/SubHeader/SubNavBar";
import Attendance from "./Pages/Attendance/Attendance";
import StaffAttendence from "./Pages/Attendance/Attendance";
function App() {
  return (
    <>
      <NavBar active="Inventory" />
      {/* <StaffAttendence /> */}
      <Attendance></Attendance>
    </>
  );
}

export default App;
