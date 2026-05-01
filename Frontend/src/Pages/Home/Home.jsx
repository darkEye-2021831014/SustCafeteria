import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/Authcontext";
import Login from "../Login/Login";
import { WelcomeSection } from "./WelcomeSection";
import DashboardSection from "./DashBoardCard";


const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <div className="h-[calc(100vh-81px)] gap-5">
          <WelcomeSection />
          <DashboardSection />
        </div>
      )}
    </div>
  );
};

export default Home;
