import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./Authcontext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
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