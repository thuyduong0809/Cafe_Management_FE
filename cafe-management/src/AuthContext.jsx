import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      role: decoded.scope || null,
      employeeId: decoded.employeeId || null,
    };
  } catch (e) {
    console.warn("Không thể giải mã token:", e);
    return { role: null, employeeId: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    () => sessionStorage.getItem("accessToken") || null
  );
  const [role, setRole] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);

  const logout = () => {
    setRole(null);
    setEmployeeId(null);
    setAccessToken(null);
    sessionStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  useEffect(() => {
    if (accessToken) {
      const { role, employeeId } = decodeToken(accessToken);
      setRole(role);
      setEmployeeId(employeeId);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        role,
        accessToken,
        setAccessToken,
        logout,
        employeeId,
        setEmployeeId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
