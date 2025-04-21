import { Card, Descriptions, Typography, Avatar, Spin, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";

const { Title } = Typography;

export default function AccountPage() {
  const { user } = useAuth(); // lấy từ context sau khi login
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAccountInfo = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/business/employee/findEmployeeByAccount?account=${user.username}`,
        { withCredentials: true }
      );
      setData(res.data);
    } catch (error) {
      message.error("Không thể tải thông tin tài khoản");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.username) {
      fetchAccountInfo();
    }
  }, [user]);

  if (loading) return <Spin />;

  if (!data) return <p>Không có dữ liệu người dùng.</p>;

  return (
    <Card>
      <Title level={4}>Thông tin tài khoản</Title>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Avatar size={100} src={data.avatar} />
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tên nhân viên">
            {data.name}
          </Descriptions.Item>
          <Descriptions.Item label="Tài khoản">
            {data.account}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {data.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {data.birthDate}
          </Descriptions.Item>
          <Descriptions.Item label="Chức vụ">{data.role}</Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  );
}
