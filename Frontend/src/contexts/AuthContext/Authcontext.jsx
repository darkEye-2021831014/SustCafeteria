import { createContext } from "react";
import { useUser } from "../../hooks/useUser";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { data: user, isLoading, isError } = useUser();

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        loading: isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
