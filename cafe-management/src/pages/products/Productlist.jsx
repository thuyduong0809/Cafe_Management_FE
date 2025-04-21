import { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { getAllProducts, deleteProduct } from "../../api/productApi";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res);
    } catch (err) {
      message.error("Lỗi khi tải sản phẩm!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      message.success("Đã xóa sản phẩm!");
      fetchProducts();
    } catch (err) {
      message.error("Xóa thất bại!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => `${text} VND`,
    },
    { title: "Danh mục", dataIndex: "categoryName", key: "categoryName" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button onClick={() => navigate(`/products/edit/${record.id}`)}>
            Sửa
          </Button>{" "}
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý sản phẩm</h2>
      <Button
        type="primary"
        onClick={() => navigate("/products/add")}
        style={{ marginBottom: 16 }}
      >
        Thêm sản phẩm
      </Button>
      <Table dataSource={products} columns={columns} rowKey="id" />
    </div>
  );
}
