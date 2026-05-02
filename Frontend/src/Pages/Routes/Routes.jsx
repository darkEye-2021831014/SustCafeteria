import ErrorPage from "../ErrorPage/ErrorPage";
import Root from "../Root/Root";
import Home from "../Home/Home";
import Attendance from "../Attendance/Attendance";
import { createBrowserRouter } from "react-router";
import Staff from "../Staff/Staff";
import Inventory from "../Inventory/Inventory";
import Menu from "../Menu/Menu";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import ProtectedRoute from "../../contexts/AuthContext/ProtectedRoute";
import MenuControl from "../Menu/MenuControl";
import Report from "../Report/Report";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "menu",
        element: (
          <ProtectedRoute>
            <MenuControl />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "attendance",
        element: (
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        ),
      },
      {
        path: "staff",
        element: (
          <ProtectedRoute>
            <Staff />
          </ProtectedRoute>
        ),
      },
      {
        path: "inventory",
        element: (
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Inventory />,
          },
          {
            path: "low-stock",
            element: <Inventory />,
          },
          {
            path: "available",
            element: <Inventory />,
          },
          {
            path: "add-item",
            element: <Inventory />,
          },
          {
            path: "remove-item",
            element: <Inventory />,
          },
          {
            path: "stock-usage",
            element: <Inventory />,
          },
        ],
      },
      {
        path: "report",
        element: <ProtectedRoute><Report /></ProtectedRoute>,
        children: [
          {
            index: true,
            element: <Report />,
          },
          {
            path: "sales-report",
            element: <Report />,
          },
          {
            path: "inventory-report",
            element: <Report />,
          },
          {
            path: "attendance-report",
            element: <Report />,
          },
        ],
      },
    ],
  },
]);
