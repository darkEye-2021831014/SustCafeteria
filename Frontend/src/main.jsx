import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { router } from "./Pages/Routes/Routes.jsx";
import { RouterProvider } from "react-router";

import AuthProvider from "./contexts/AuthContext/Authcontext.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AttendanceProvider from "./contexts/AttendanceContext/AttendanceContext.jsx";
import { InventoryContext } from "./contexts/InventoryContext/InventoryContext.jsx";

import MenuControl from "./Pages/Menu/MenuControl.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InventoryContext>
        <AttendanceProvider>
        <RouterProvider router={router} />
        </AttendanceProvider>
        </InventoryContext>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
