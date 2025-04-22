import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./AuthContext";
import ProductList from "./pages/products/Productlist";
import EmployeeList from "./pages/employees/EmployeeList";
import SalesStatistic from "./pages/statistics/SalesStatistic";
import AccountPage from "./pages/account/AccountPage";
import CustomerPage from "./pages/customer/CustomerPage";
import CategoryPage from "./pages/category/CategoryPage";
import EditEmployee from "./pages/employees/EditEmployee";
import AddEmployee from "./pages/employees/AddEmployee";
import SearchOrderPage from "./pages/orders/SearchOrderPage";
import CreateInvoice from "./pages/orders/CreateInvoice";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/products" element={<ProductList />} />
            <Route path="/orders" element={<CreateInvoice />} />
            <Route path="/searchorder" element={<SearchOrderPage />} />

            {/* ADMIN only routes */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/editemployees/:id" element={<EditEmployee />} />
              <Route path="/addemployees" element={<AddEmployee />} />
              <Route path="/statistics" element={<SalesStatistic />} />
            </Route>

            <Route path="/account" element={<AccountPage />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/categories" element={<CategoryPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
