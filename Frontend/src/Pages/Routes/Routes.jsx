import ErrorPage from "../ErrorPage/ErrorPage";
import Root from "../Root/Root";
import Home from "../Home/Home";
import Attendance from "../Attendance/Attendance";
import { createBrowserRouter } from "react-router";
import Staff from "../Staff/Staff";
import Inventory from "../Inventory/Inventory";
import Supplier from "../Supplier/Supplier";
import Report from "../Report/Report";

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
      {
        path: "supplier",
        element:<Supplier/>,
      },
      {
        path:"report",
        element:<Report/>,
        children:[
          {
            index:true,
            element:<Report/>,
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