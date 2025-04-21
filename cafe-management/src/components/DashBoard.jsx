import React from "react";
import { Layout, Menu, Card, Row, Col, Typography, Button } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} style={{ background: "#fff" }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="1">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/products">Sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/employees">Nhân viên</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/orders">Đơn hàng</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/statistics">Thống kê doanh thu</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Title level={3} style={{ padding: "16px 0", textAlign: "center" }}>
            Dashboard
          </Title>
        </Header>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Quản lý Sản phẩm">
                <Button type="primary" block>
                  <Link to="/products">Xem danh sách sản phẩm</Link>
                </Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Quản lý Nhân viên">
                <Button type="primary" block>
                  <Link to="/employees">Xem danh sách nhân viên</Link>
                </Button>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Quản lý Đơn hàng">
                <Button type="primary" block>
                  <Link to="/orders">Tạo hóa đơn mới</Link>
                </Button>
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "24px" }}>
            <Col span={8}>
              <Card title="Thống kê doanh thu">
                <Button type="primary" block>
                  <Link to="/statistics">Xem thống kê doanh thu</Link>
                </Button>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
