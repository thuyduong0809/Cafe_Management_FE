import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

export default function UploadImage({ onUploadSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8081/myapp/cloudinary/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      const imageUrl = response.data;
      message.success("Upload thành công!");
      onUploadSuccess(imageUrl); // callback để gửi URL về component cha
    } catch (error) {
      console.error("Upload lỗi:", error);
      message.error("Upload thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Upload
      customRequest={handleUpload}
      showUploadList={false}
      accept="image/*"
    >
      <Button icon={<UploadOutlined />} loading={loading}>
        Tải ảnh lên
      </Button>
    </Upload>
  );
}
