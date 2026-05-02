import React, { useContext } from "react";
import PillList from "./PillList";
import AuthPill from "./AuthPill";
import sustLogo from "../../assets/sust_logo.png";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/Authcontext";

const NavBar = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  // if (loading) {
  //   return (
  //     <div className="sticky top-0 z-50 flex h-[70px] w-full items-center justify-center border-b border-b-[#F54758] bg-[#E8B5BA] px-5 text-sm sm:text-base">
  //       Loading...
  //     </div>
  //   );
  // }

  const isAdmin = user?.role?.toLowerCase() === "manager";

  const routeMap = {
    Home: "/",
    Menu: "/menu",
    Inventory: "/inventory",
    Attendance: "/attendance",
    Staff: "/staff",
    Report: "/report",
    Profile: "/profile",
  };

  const handleNavClick = (item) => {
    const route = routeMap[item];

    if (!user) {
      navigate("/login", {
        state: { from: { pathname: route } },
      });
    } else {
      navigate(route);
    }
  };

  const getActive = () => {
    if (location.pathname === "/") return "Home";
    if (location.pathname === "/attendance") return "Attendance";
    if (location.pathname === "/menu") return "Menu";
    if (location.pathname.startsWith("/inventory")) return "Inventory";
    if (location.pathname === "/staff") return "Staff";
    if (location.pathname === "/report") return "Report";
    if (location.pathname === "/profile") return "Profile";
    return "";
  };

  const active = getActive();

  const headerPillList = isAdmin
    ? ["Home", "Menu", "Inventory", "Staff", "Report"]
    : ["Home", "Menu", "Inventory", "Attendance"];

  return (
    <div
      className={`flex bg-[#650b13] border-b border-b-[#F54758] h-17.5 w-full items-center justify-between px-5 py-3 text-white ${className}`}
    >
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => handleNavClick("Home")}
      >
        <img src={sustLogo} alt="sustLogo" className="h-14 rounded-[5px]" />
        <div className="font-tourney text-[30px]">Sust Cafeteria</div>
      </div>

      <div className="flex items-center h-fit gap-12">
        <PillList
          headerPillList={headerPillList}
          active={active}
          onItemClick={handleNavClick}
          linkMode={!!user}
        />

        <AuthPill
          signedIn={!!user}
          isActive={active === "Profile"}
          onProfileClick={() => handleNavClick("Profile")}
        />
      </div>
    </div>
  );
};

export default NavBar;
