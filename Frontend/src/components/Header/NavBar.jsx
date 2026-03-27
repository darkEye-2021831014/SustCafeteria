import React from "react";
import PillList from "./PillList";
import AuthPill from "./AuthPill";
import sustLogo from "../../assets/sustLogo.png";
import { useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/Authcontext";

const NavBar = ({
  // active = "Supplier",
  // isAdmin = false,
  signedIn = true,
  className,
}) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role?.toLowerCase() === "manager";
  console.log("User in NavBar:", user);
  console.log("Is Admin in NavBar:", isAdmin);
  const getActive = () => {
    if (location.pathname === "/") return "Home";
    if (location.pathname === "/attendance") return "Attendance";
    if (location.pathname === "/menu") return "Menu";
    if (location.pathname === "/inventory") return "Inventory";
    if (location.pathname === "/supplier") return "Supplier";
    if (location.pathname === "/staff") return "Staff";
    if (location.pathname === "/report") return "Report";
    return "";
  };
  const active = getActive();
  const headerPillList = isAdmin
    ? ["Home", "Menu", "Inventory", "Staff", "Supplier", "Report"]
    : ["Home", "Menu", "Inventory", "Attendance", "Supplier"];

  return (
    <div
      className={`flex bg-[#E8B5BA] border border-[#F54758] h-fit w-full items-center justify-between px-5 py-3 ${className} `}
    >
      <div className="flex items-center gap-4 cursor-pointer">
        <img src={sustLogo} alt="sustLogo" className="w-auto h-14" />
        <div className="font-tourney text-[30px]">Sust Cafeteria</div>
      </div>

      <div className="flex items-center h-fit gap-12">
        <PillList headerPillList={headerPillList} active={active} />
        <AuthPill signedIn={signedIn} isActive={active === "Profile"} />
      </div>
    </div>
  );
};

export default NavBar;
