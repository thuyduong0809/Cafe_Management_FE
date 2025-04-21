import { useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const EditEmployee = () => {
  const { empId } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/business/employee/${empId}`);
        form.setFieldsValue(res.data);
      } catch (err) {
        message.error("Không thể tải dữ liệu");
      }
    };
    fetchEmployee();
  }, [empId, form]);

  const handleFinish = async (values) => {
    try {
      const data = {
        empName: values.empName,
        empYearOfBirth: parseInt(values.empYearOfBirth),
        empPhone: values.empPhone,
        empRole: values.empRole,
        empAccount: values.empAccount, // giữ nguyên
        // Không sửa mật khẩu ở đây
      };
      await api.put(`/business/employee/${empId}`, data);
      message.success("Cập nhật thành công");
      navigate("/employees");
    } catch (err) {
      message.error("Cập nhật thất bại");
    }
  };

  return (
    <div>
      <h2>Sửa nhân viên</h2>
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
          <Input disabled />
        </Form.Item>
        <Form.Item name="empRole" label="Vai trò" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="ADMIN">Admin</Select.Option>
            <Select.Option value="EMPLOYEE">Nhân viên</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form>
    </div>
  );
};

export default EditEmployee;
