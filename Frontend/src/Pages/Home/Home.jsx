import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/Authcontext";
import Login from "../Login/Login";
import { WelcomeSection } from "./WelcomeSection";
import DashboardSection from "./DashBoardCard";
const Home = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role?.toLowerCase();
  const isManager = role === "manager";
  return (
    <div>
      {!user ? (
        <Login key="login"/>
      ) : (
        <div className="h-[calc(100vh-70px)] overflow-hidden gap-5">
          <WelcomeSection isManager={isManager} userName={user?.name}/>
          <DashboardSection isManager={isManager}/>
        </div>
      )}
    </div>
  );
};

export default Home;
