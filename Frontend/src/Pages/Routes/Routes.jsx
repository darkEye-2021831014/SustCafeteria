import ErrorPage from "../ErrorPage/ErrorPage";
import Root from "../Root/Root";
import Home from "../Home/Home";
import Attendance from "../Attendance/Attendance";
import { createBrowserRouter } from "react-router";
import Staff from "../Staff/Staff";
import Inventory from "../Inventory/Inventory";
import Menu from "../Menu/Menu";
import Profile from "../Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
      {
        path: "staff",
        element: <Staff />,
      },
      {
        path: "inventory",
        element: <Inventory />,
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
        ],
      },
    ],
  },
]);
