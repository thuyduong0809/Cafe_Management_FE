import { Form, Input, Button, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import api from "../../utils/api";

const AddEmployee = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const handleFinish = async (values) => {
    try {
      const data = {
        empName: values.empName,
        empAccount: values.empAccount,
        empPassword: values.empPassword,
        empRole: values.empRole,
        empYearOfBirth: values.empYearOfBirth,
        empPhone: values.empPhone,
      };

      await api.post("/business/employee", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

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
          name="empName"
          label="Tên nhân viên"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="empYearOfBirth"
          label="Năm sinh"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="empPhone"
          label="Số điện thoại"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="empAccount"
          label="Tài khoản"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="empPassword"
          label="Mật khẩu"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="empRole" label="Vai trò" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="ADMIN">Quản lý</Select.Option>
            <Select.Option value="USER">Nhân viên</Select.Option>
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
