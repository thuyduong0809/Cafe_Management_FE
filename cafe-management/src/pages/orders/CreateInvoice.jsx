import React, { useEffect, useState } from "react";
import {
  Card,
  InputNumber,
  Typography,
  Divider,
  Row,
  Col,
  Image,
  Button,
  Table,
  message,
} from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const CreateInvoice = () => {
  const [productList, setProductList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customerCash, setCustomerCash] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/business/products")
      .then((res) => setProductList(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Chọn sản phẩm vào hóa đơn
  const handleSelectProduct = (product) => {
    const exists = selectedProducts.find((item) => item.id === product.id);
    if (!exists) {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  // Đổi số lượng sản phẩm đã chọn
  const handleQuantityChange = (id, value) => {
    setSelectedProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: value } : item))
    );
  };

  // Tính tổng tiền
  const getTotal = () =>
    selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Tính tiền thừa
  const getChange = () => customerCash - getTotal();

  // Gửi hóa đơn về backend
  const handleSubmit = () => {
    if (selectedProducts.length === 0) {
      return message.warning("Chưa chọn sản phẩm!");
    }
    if (customerCash < getTotal()) {
      return message.warning("Tiền khách đưa chưa đủ!");
    }

    const orderPayload = {
      totalAmount: getTotal(),
      customerCash,
      changeAmount: getChange(),
      orderDetails: selectedProducts.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    setLoading(true);
    axios
      .post("http://localhost:8080/api/business/order", orderPayload)
      .then(() => {
        message.success("Tạo hóa đơn thành công!");
        setSelectedProducts([]);
        setCustomerCash(0);
      })
      .catch(() => {
        message.error("Tạo hóa đơn thất bại!");
      })
      .finally(() => setLoading(false));
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Row align="middle" gutter={8}>
          <Col>
            <Image src={record.image} width={40} height={40} />
          </Col>
          <Col>
            <Text>{text}</Text>
          </Col>
        </Row>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} đ`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
        />
      ),
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_, record) =>
        `${(record.price * record.quantity).toLocaleString()} đ`,
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {/* Bên trái: chọn sản phẩm */}
      <Col xs={24} md={12}>
        <Title level={3}>Chọn sản phẩm</Title>
        <Row gutter={[16, 16]}>
          {productList.map((product) => (
            <Col span={12} key={product.id}>
              <Card
                hoverable
                onClick={() => handleSelectProduct(product)}
                cover={
                  <Image alt={product.name} src={product.image} height={150} />
                }
              >
                <Card.Meta
                  title={product.name}
                  description={`${product.price.toLocaleString()} đ`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Col>

      {/* Bên phải: hóa đơn */}
      <Col xs={24} md={12}>
        <Title level={3}>Hóa đơn</Title>
        <Table
          dataSource={selectedProducts}
          columns={columns}
          rowKey="id"
          pagination={false}
          size="small"
        />
        <Divider />
        <Row justify="space-between" align="middle">
          <Col>
            <Text strong>Tổng tiền:</Text>
          </Col>
          <Col>
            <Text strong>{getTotal().toLocaleString()} đ</Text>
          </Col>
        </Row>
        <Row justify="space-between" align="middle" style={{ marginTop: 10 }}>
          <Col>
            <Text>Tiền khách đưa:</Text>
          </Col>
          <Col>
            <InputNumber
              min={0}
              value={customerCash}
              onChange={setCustomerCash}
              style={{ width: 150 }}
              addonAfter="đ"
            />
          </Col>
        </Row>
        <Row justify="space-between" align="middle" style={{ marginTop: 10 }}>
          <Col>
            <Text>Tiền thừa:</Text>
          </Col>
          <Col>
            <Text>{getChange() > 0 ? getChange().toLocaleString() : 0} đ</Text>
          </Col>
        </Row>
        <Divider />
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={selectedProducts.length === 0 || customerCash < getTotal()}
          loading={loading}
        >
          Tạo hóa đơn
        </Button>
      </Col>
    </Row>
  );
};

export default CreateInvoice;
