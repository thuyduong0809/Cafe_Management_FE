import { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8081/myapp/api/business/employee",
        {
          withCredentials: true,
        }
      );
      setEmployees(res.data);
    } catch (err) {
      message.error("Không thể tải danh sách nhân viên");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8081/myapp/api/business/employee/${id}`,
        {
          withCredentials: true,
        }
      );
      message.success("Đã xóa nhân viên");
      fetchEmployees();
    } catch (err) {
      message.error("Xóa thất bại");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Tài khoản", dataIndex: "account", key: "account" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => navigate(`/sua-nhan-vien/${record.id}`)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa nhân viên?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="link">
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Danh sách nhân viên</h2>
      <Button type="primary" onClick={() => navigate("/them-nhan-vien")}>
        Thêm nhân viên
      </Button>
      <Table
        columns={columns}
        dataSource={employees}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default EmployeeList;
