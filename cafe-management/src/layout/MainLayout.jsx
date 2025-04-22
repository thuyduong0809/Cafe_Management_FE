import { Layout, Menu, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  DollarOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    {
      key: "dashboard",
      label: <Link to="/orders">Trang chủ</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "products",
      label: <Link to="/products">Sản phẩm</Link>,
      icon: <ShoppingCartOutlined />,
    },
    {
      key: "orders",
      label: <Link to="/orders">Hóa đơn</Link>,
      icon: <FileTextOutlined />,
    },
    {
      key: "employees",
      label: <Link to="/employees">Nhân viên</Link>,
      icon: <TeamOutlined />,
    },
    {
      key: "statistics",
      label: <Link to="/statistics">Thống kê</Link>,
      icon: <DollarOutlined />,
    },
  ];

  const userMenu = (
    <Menu
      items={[
        { key: "info", label: <Link to="/account">Thông tin cá nhân</Link> },
        { type: "divider" },
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: "Đăng xuất",
          onClick: handleLogout,
        },
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div
          className="logo"
          style={{
            height: 50,
            color: "#fff",
            textAlign: "center",
            paddingTop: 10,
          }}
        >
          ☕ Cafe Admin
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]}>
          {menuItems
            .filter((item) => !item.roles || item.roles.includes(role))
            .map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))}
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            backgroundColor: "#fff",
            textAlign: "right",
            paddingRight: 20,
          }}
        >
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <span style={{ cursor: "pointer" }}>
              <Avatar icon={<UserOutlined />} /> {user?.username}{" "}
            </span>
          </Dropdown>
        </Header>

        <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
