import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
  const { role, accessToken } = useAuth();

  if (role === null) return <h2>Loading...</h2>;

  if (!accessToken) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}
