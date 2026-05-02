import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./Authcontext";
import { useProfile } from "../../hooks/useUser";

const ProtectedRoute = ({ children }) => {
  const { data: user, isLoading, error } = useProfile();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-70px)] w-full bg-gray-50 flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
