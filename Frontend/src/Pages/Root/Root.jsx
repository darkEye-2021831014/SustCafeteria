import React from "react";
import { Outlet } from "react-router";
import NavBar from "../../components/Header/NavBar";
const Root = () => {
  return (
    <div className="h-screen overflow-hidden">
      <NavBar />
      <main className="pt-17.5">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
