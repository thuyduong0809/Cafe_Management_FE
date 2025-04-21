import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
  Card,
} from "antd";
import axios from "axios";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8080/api/business/categories",
        {
          withCredentials: true,
        }
      );
      setCategories(res.data);
    } catch (err) {
      message.error("Không thể tải danh mục");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateOrUpdate = async (values) => {
    try {
      if (editingCategory) {
        await axios.put(
          `http://localhost:8080/api/business/categories/${editingCategory.id}`,
          values,
          { withCredentials: true }
        );
        message.success("Cập nhật danh mục thành công!");
      } else {
        await axios.post(
          "http://localhost:8080/api/business/categories",
          values,
          {
            withCredentials: true,
          }
        );
        message.success("Thêm danh mục thành công!");
      }
      fetchCategories();
      setFormVisible(false);
      form.resetFields();
      setEditingCategory(null);
    } catch (err) {
      message.error("Lỗi khi lưu danh mục!");
    }
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    form.setFieldsValue(record);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/business/categories/${id}`,
        {
          withCredentials: true,
        }
      );
      message.success("Xóa danh mục thành công!");
      fetchCategories();
    } catch (err) {
      message.error("Lỗi khi xóa danh mục!");
    }
  };

  return (
    <Card title="Quản lý danh mục sản phẩm">
      <Button
        type="primary"
        onClick={() => setFormVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Thêm danh mục
      </Button>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={categories}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Tên danh mục",
            dataIndex: "name",
          },
          {
            title: "Hành động",
            render: (_, record) => (
              <Space>
                <Button onClick={() => handleEdit(record)}>Sửa</Button>
                <Popconfirm
                  title="Xác nhận xóa?"
                  onConfirm={() => handleDelete(record.id)}
                >
                  <Button danger>Xóa</Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      <Modal
        title={editingCategory ? "Cập nhật danh mục" : "Thêm danh mục"}
        open={formVisible}
        onCancel={() => {
          setFormVisible(false);
          form.resetFields();
          setEditingCategory(null);
        }}
        onOk={() => form.submit()}
        okText="Lưu"
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
