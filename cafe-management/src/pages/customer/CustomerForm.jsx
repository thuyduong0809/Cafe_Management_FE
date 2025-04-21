import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useEffect } from "react";

export default function CustomerForm({ initialData, onSuccess }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData]);

  const onFinish = async (values) => {
    try {
      if (initialData) {
        await axios.delete(
          `http://localhost:8081/myapp/api/business/customer/${initialData.id}`,
          {
            withCredentials: true,
          }
        );
      }

      await axios.post(
        "http://localhost:8081/myapp/api/business/customer",
        values,
        {
          withCredentials: true,
        }
      );
      message.success("Lưu khách hàng thành công!");
      onSuccess();
    } catch (error) {
      message.error("Có lỗi xảy ra khi lưu.");
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        label="Tên khách hàng"
        name="name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        {initialData ? "Cập nhật" : "Tạo mới"}
      </Button>
    </Form>
  );
}
