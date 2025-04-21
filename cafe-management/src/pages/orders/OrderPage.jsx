import React, { useState } from "react";
import { Form, Input, Button, Card, DatePicker, message } from "antd";
import { createOrder, getOrderById, getOrderByDate } from "../../api/orderApi";
import dayjs from "dayjs";

export default function OrderPage() {
  const [form] = Form.useForm();
  const [order, setOrder] = useState(null);

  const handleCreate = async (values) => {
    try {
      await createOrder(values);
      message.success("Tạo đơn hàng thành công!");
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi tạo đơn hàng.");
    }
  };

  const handleSearchById = async (id) => {
    try {
      const data = await getOrderById(id);
      setOrder(data);
      message.success("Tìm đơn hàng thành công!");
    } catch {
      message.error("Không tìm thấy đơn hàng.");
    }
  };

  const handleSearchByDate = async (date) => {
    try {
      const data = await getOrderByDate(date);
      setOrder(data);
      message.success("Tìm đơn theo ngày thành công!");
    } catch {
      message.error("Không tìm thấy đơn hàng theo ngày.");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title="Tạo Đơn Hàng" style={{ marginBottom: 24 }}>
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item
            name="employeeId"
            label="Mã nhân viên"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="totalAmount"
            label="Tổng tiền"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo đơn
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Tìm Đơn Hàng">
        <Form layout="inline" onFinish={({ id }) => handleSearchById(id)}>
          <Form.Item name="id" label="Mã đơn hàng">
            <Input style={{ width: 200 }} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Tìm theo ID</Button>
          </Form.Item>
        </Form>

        <Form
          layout="inline"
          onFinish={({ date }) => handleSearchByDate(date.format("YYYY-MM-DD"))}
          style={{ marginTop: 16 }}
        >
          <Form.Item name="date" label="Ngày">
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Tìm theo ngày</Button>
          </Form.Item>
        </Form>

        {order && (
          <div style={{ marginTop: 24 }}>
            <h3>Kết quả tìm kiếm:</h3>
            <pre>{JSON.stringify(order, null, 2)}</pre>
          </div>
        )}
      </Card>
    </div>
  );
}
