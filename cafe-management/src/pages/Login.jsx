import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  message,
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Image,
} from "antd";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useAuth } from "../AuthContext";

const { Title } = Typography;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setAccessToken } = useAuth();

  const handleLogin = async () => {
    if (username.trim() === "" || password.trim() === "") {
      message.error("Vui lòng nhập username và password!");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:8081/myapp/api/business/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username.trim(), password }),
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error(`Lỗi đăng nhập: ${res.status}`);
      }

      const data = await res.json();
      console.log("Token response:", data);

      setAccessToken(data.token);

      dispatch(
        loginSuccess({
          user: data.employee,
          accessToken: data.token,
          role: data.role,
        })
      );

      message.success("Đăng nhập thành công!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error.message);
      message.error("Đăng nhập thất bại! Kiểm tra tài khoản và mật khẩu.");
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", background: "#f5f5f5" }}
    >
      <Col xs={22} sm={20} md={16} lg={12} xl={10}>
        <Card>
          <Row gutter={32} align="middle">
            <Col span={12}>
              <Image
                alt="coffee shop"
                src="/image/coffee-shop.jpg"
                width="100%"
                style={{ borderRadius: 8 }}
                preview={false}
              />
            </Col>
            <Col span={12}>
              <Title level={2}>The Study Coffee</Title>
              <Form layout="vertical" onFinish={handleLogin}>
                <Form.Item
                  label="Tên tài khoản"
                  name="username"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên tài khoản!" },
                  ]}
                >
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Tên tài khoản"
                  />
                </Form.Item>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                  ]}
                >
                  <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Đăng Nhập
                  </Button>
                </Form.Item>
                <Form.Item>
                  <a href="#" style={{ fontSize: 12 }}>
                    Quên mật khẩu?
                  </a>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
