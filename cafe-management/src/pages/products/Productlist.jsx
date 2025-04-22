import { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Card } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { getAllProducts, deleteProduct } from "../../api/productApi";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllProducts();
      console.log("Dữ liệu sản phẩm:", res);
      setProducts(res);
    } catch (err) {
      console.error("Lỗi tải sản phẩm:", err);
      message.error("Lỗi khi tải sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xóa sản phẩm
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      message.success("Đã xóa sản phẩm!");
      fetchProducts();
    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
      message.error("Xóa thất bại!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Định nghĩa cột bảng
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: "Danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => navigate(`/products/edit/${record.id}`)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Card title="Quản lý sản phẩm">
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/products/add")}
        >
          Thêm sản phẩm
        </Button>
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/orders")}
        >
          Quay lại
        </Button>
      </div>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        bordered
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
}
