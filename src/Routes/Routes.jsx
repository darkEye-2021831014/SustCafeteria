import { createBrowserRouter } from "react-router";
import Errorpage from "../Pages/ErrorPage/Errorpage";
import Root from "../Pages/Root/Root";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
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
      {
        path:'/register',
        Component:Register,
      },
      {
        path:'/login',
        Component:Login,
      }
      
    ],
  },
]);
