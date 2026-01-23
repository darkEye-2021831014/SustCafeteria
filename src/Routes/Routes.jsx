import { createBrowserRouter } from "react-router";
import Errorpage from "../Pages/ErrorPage/Errorpage";
import Root from "../Pages/Root/Root";
import Home from "../Pages/Home/Home";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Errorpage></Errorpage>,
    children: [
      {
        index: true,
        Component:Home,
      },
      
    ],
  },
]);
