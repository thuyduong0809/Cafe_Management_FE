import { useEffect, useState } from "react";
import { Table, Button, Modal, message, Popconfirm } from "antd";
import axios from "axios";
import CustomerForm from "./CustomerForm";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8081/myapp/api/business/customer",
        {
          withCredentials: true,
        }
      );
      setCustomers(res.data);
    } catch (error) {
      message.error("Không thể tải danh sách khách hàng.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8081/myapp/api/business/customer/${id}`,
        {
          withCredentials: true,
        }
      );
      message.success("Xóa khách hàng thành công!");
      fetchCustomers();
    } catch (error) {
      message.error("Xóa khách hàng thất bại.");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", width: 60 },
    { title: "Tên", dataIndex: "name" },
    { title: "SĐT", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Hành động",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setSelectedCustomer(record);
              setOpenForm(true);
            }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn chắc chắn xóa?"
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
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h2>Danh sách khách hàng</h2>
        <Button
          type="primary"
          onClick={() => {
            setSelectedCustomer(null);
            setOpenForm(true);
          }}
        >
          Thêm khách hàng
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={customers}
        loading={loading}
        rowKey="id"
        bordered
      />

      <Modal
        title={selectedCustomer ? "Chỉnh sửa khách hàng" : "Thêm khách hàng"}
        open={openForm}
        footer={null}
        onCancel={() => setOpenForm(false)}
      >
        <CustomerForm
          initialData={selectedCustomer}
          onSuccess={() => {
            setOpenForm(false);
            fetchCustomers();
          }}
        />
      </Modal>
    </>
  );
}
