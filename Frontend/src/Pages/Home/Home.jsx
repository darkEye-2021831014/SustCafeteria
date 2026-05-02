import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/Authcontext";
import Login from "../Login/Login";
import { WelcomeSection } from "./WelcomeSection";
import DashboardSection from "./DashboardCard";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {!user ? (
        <Login key="login"/>
      ) : (
        <div className="h-[calc(100vh-82px)] gap-5">
          <WelcomeSection />
          <DashboardSection />
        </div>
      )}
    </div>
  );
};

export default Home;
