
import ErrorPage from "../ErrorPage/ErrorPage";
import Root from "../Root/Root";
import Home from "../Home/Home";
import Attendance from "../Attendance/Attendance";
import { createBrowserRouter } from "react-router";
import Staff from "../Staff/Staff";

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
        path: "/attendance",
        Component: Attendance,
      },
      {
        path: "staff",
        Component:Staff
      }
    ],
  },
]);