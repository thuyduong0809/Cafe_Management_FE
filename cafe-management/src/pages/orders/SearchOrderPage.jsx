import { useState } from "react";
import { Card, DatePicker, Form, Input, Button, message } from "antd";
import { getOrderById, getOrderByDate } from "../../api/orderApi";

export default function SearchOrderPage() {
  const [order, setOrder] = useState(null);

  const handleSearchById = async (values) => {
    try {
      const data = await getOrderById(values.id);
      setOrder(data);
      message.success("Tìm đơn hàng thành công!");
    } catch {
      message.error("Không tìm thấy đơn hàng.");
    }
  };

  const handleSearchByDate = async (values) => {
    try {
      const data = await getOrderByDate(values.date.format("YYYY-MM-DD"));
      setOrder(data);
      message.success("Tìm đơn hàng theo ngày thành công!");
    } catch {
      message.error("Không tìm thấy đơn hàng theo ngày.");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title="Tìm Đơn Hàng">
        <Form layout="inline" onFinish={handleSearchById}>
          <Form.Item name="id" label="Mã đơn hàng">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Tìm theo ID</Button>
          </Form.Item>
        </Form>

        <Form
          layout="inline"
          onFinish={handleSearchByDate}
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
