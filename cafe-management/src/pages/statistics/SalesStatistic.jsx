import { Card, DatePicker, Table, Typography, message } from "antd";
import axios from "axios";
import { useState } from "react";

const { Title } = Typography;

export default function SalesStatistic() {
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDateChange = async (date, dateString) => {
    setDate(date);
    if (!dateString) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/business/order/date?date=${dateString}`,
        { withCredentials: true }
      );
      setData(res.data);
    } catch (err) {
      message.error("Không tìm thấy dữ liệu doanh thu");
      setData(null);
    }
    setLoading(false);
  };

  return (
    <Card title={<Title level={4}>Thống kê doanh thu</Title>}>
      <DatePicker onChange={handleDateChange} format="YYYY-MM-DD" />
      <br />
      <br />
      {data ? (
        <Table
          dataSource={data.items}
          loading={loading}
          rowKey="productId"
          pagination={false}
        >
          <Table.Column title="Tên sản phẩm" dataIndex="productName" />
          <Table.Column title="Số lượng bán" dataIndex="quantitySold" />
          <Table.Column title="Tổng tiền" dataIndex="totalRevenue" />
        </Table>
      ) : (
        !loading && <p>Vui lòng chọn ngày để xem thống kê.</p>
      )}
    </Card>
  );
}
