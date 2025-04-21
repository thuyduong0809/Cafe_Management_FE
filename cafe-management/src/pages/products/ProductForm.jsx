import { Form, Input, InputNumber, Button, message } from "antd";
import {
  addProduct,
  getProductById,
  updateProduct,
} from "../../api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductForm() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      getProductById(id).then((data) => {
        form.setFieldsValue(data);
      });
    }
  }, [id]);

  const onFinish = async (values) => {
    try {
      if (isEdit) {
        await updateProduct(id, values);
        message.success("Cập nhật sản phẩm thành công!");
      } else {
        await addProduct(values);
        message.success("Thêm sản phẩm thành công!");
      }
      navigate("/products");
    } catch {
      message.error("Lỗi khi lưu sản phẩm!");
    }
  };

  return (
    <div>
      <h2>{isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="ID Danh mục"
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEdit ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
