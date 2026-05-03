import React from "react";
import { Outlet } from "react-router";
import NavBar from "../../components/Header/NavBar";
const Root = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="shrink-0">
        <NavBar />
      </div>

      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
