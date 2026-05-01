import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/Authcontext";
import Login from "../Login/Login";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-81px)] gap-5">
          <h1 className="text-4xl font-bold text-[#F54758]">
            Welcome, {user?.name}!
          </h1>
          <p className="text-lg text-gray-600">
            This is the home page of the SUST Cafeteria Management System. Use
            the navigation bar to access different features.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
