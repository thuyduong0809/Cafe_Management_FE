import { useEffect, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { empId } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/myapp/api/business/employee/${empId}`,
          {
            withCredentials: true,
          }
        );
        form.setFieldsValue(res.data);
      } catch (err) {
        message.error("Không thể tải dữ liệu");
      }
    };
    fetchEmployee();
  }, [empId]);

  const handleFinish = async (values) => {
    try {
      await axios.put(
        `http://localhost:8081/myapp/api/business/employee/${empId}`,
        values,
        {
          withCredentials: true,
        }
      );
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
          <Input disabled />
        </Form.Item>
        <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
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
