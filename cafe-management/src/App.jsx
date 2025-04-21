import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./components/DashBoard";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./AuthContext";
import ProductList from "./pages/products/Productlist";
import OrderPage from "./pages/orders/OrderPage";
import EmployeeList from "./pages/employees/EmployeeList";
import SalesStatistic from "./pages/statistics/SalesStatistic";
import AccountPage from "./pages/account/AccountPage";
import CustomerPage from "./pages/customer/CustomerPage";
import CategoryPage from "./pages/category/CategoryPage";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Route cho trang Login */}
        <Route path="/login" element={<Login />} />

        {/* Route cho các trang cần bảo vệ */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Các route con trong MainLayout */}
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="orders" element={<OrderPage />} />

          {/* Route cho ADMIN */}
          <Route
            path="employees"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="statistics"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <SalesStatistic />
              </ProtectedRoute>
            }
          />

          {/* Các route không phân biệt vai trò */}
          <Route path="account" element={<AccountPage />} />
          <Route path="customers" element={<CustomerPage />} />
          <Route path="categories" element={<CategoryPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
