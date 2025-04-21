import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/unauthorized"
          element={<div>Không có quyền truy cập</div>}
        />

        {/* Route bảo vệ cho toàn bộ hệ thống đã đăng nhập */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<div>Trang sản phẩm</div>} />
            <Route path="orders" element={<div>Trang hóa đơn</div>} />
            <Route
              path="account"
              element={<div>Trang thông tin tài khoản</div>}
            />

            {/* Chỉ ADMIN được vào */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route
                path="employees"
                element={<div>Trang danh sách nhân viên</div>}
              />
              <Route
                path="statistics"
                element={<div>Trang thống kê doanh thu</div>}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
