import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [expire, setExpire] = useState("");
  const [decodedUser, setDecodedUser] = useState([]);
  const [token, setToken] = useState("");

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        token,
        setToken,
        decodedUser,
        setDecodedUser,
        expire,
        setExpire,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
