import React from "react";
import Menu from "./Menu";
import MenuManager from "../MenuManagement/MenuManager";
import { useProfile } from "../../hooks/useUser";

const MenuControl = () => {
  const { data: user, isLoading, error } = useProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (user.role === "manager") return <MenuManager />;

  return <Menu />;
};

export default MenuControl;
