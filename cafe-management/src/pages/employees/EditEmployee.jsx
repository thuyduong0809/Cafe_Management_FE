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
        form.setFieldsValue({
          empAccount: res.data.empAccount,
          empName: res.data.empName,
          empYearOfBirth: res.data.empYearOfBirth,
          empPhone: res.data.empPhone,
          empRole: res.data.empRole,
        });
      } catch (err) {
        message.error("Không thể tải dữ liệu");
      }
    };
    fetchEmployee();
  }, [empId, form]);

  const handleFinish = async (values) => {
    try {
      const data = {
        empAccount: values.empAccount, // Đảm bảo chỉ gửi tài khoản, số điện thoại, và mật khẩu
        empPhone: values.empPhone,
        empPassword: values.empPassword,
      };

      await api.put(`/business/employee/${empId}`, data);
      message.success("Cập nhật thành công");
      navigate("/employees");
    } catch (err) {
      message.error("Cập nhật thất bại");
    }
  };

  const handleGoBack = () => {
    navigate("/employees");
  };

  return (
    <div>
      <h2>Sửa nhân viên</h2>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {/* Tài khoản vẫn hiển thị nhưng không thể chỉnh sửa */}
        <Form.Item
          name="empAccount"
          label="Tài khoản"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        {/* Tên nhân viên vẫn hiển thị nhưng không thể chỉnh sửa */}
        <Form.Item name="empName" label="Tên nhân viên">
          <Input disabled />
        </Form.Item>

        {/* Năm sinh vẫn hiển thị nhưng không thể chỉnh sửa */}
        <Form.Item name="empYearOfBirth" label="Năm sinh">
          <Input disabled />
        </Form.Item>

        {/* Số điện thoại có thể chỉnh sửa */}
        <Form.Item
          name="empPhone"
          label="Số điện thoại"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        {/* Vai trò vẫn hiển thị nhưng không thể chỉnh sửa */}
        <Form.Item name="empRole" label="Vai trò">
          <Select disabled>
            <Select.Option value="ADMIN">Admin</Select.Option>
            <Select.Option value="EMPLOYEE">Nhân viên</Select.Option>
          </Select>
        </Form.Item>

        {/* Mật khẩu có thể chỉnh sửa */}
        <Form.Item name="empPassword" label="Mật khẩu">
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
        <Button
          type="default"
          onClick={handleGoBack}
          style={{ marginLeft: 10 }}
        >
          Quay lại
        </Button>
      </Form>
    </div>
  );
};

export default EditEmployee;
