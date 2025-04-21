import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      await axios.post(
        "http://localhost:8081/myapp/api/business/employee",
        values,
        {
          withCredentials: true,
        }
      );
      message.success("Đã thêm nhân viên");
      navigate("/employees");
    } catch (err) {
      message.error("Thêm thất bại");
    }
  };

  return (
    <div>
      <h2>Thêm nhân viên</h2>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Tên nhân viên"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="account"
          label="Tài khoản"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="ADMIN">Admin</Select.Option>
            <Select.Option value="EMPLOYEE">Nhân viên</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form>
    </div>
  );
};

export default AddEmployee;
