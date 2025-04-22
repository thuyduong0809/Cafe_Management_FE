import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Table,
  Space,
  message,
  Row,
  Col,
  Card,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import api from "../../utils/api";

const { Title, Text } = Typography;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/business/employee");
      const filtered = res.data.filter((emp) => emp.empRole !== "");
      setEmployees(filtered);
    } catch (err) {
      message.error("Lỗi khi tải danh sách nhân viên");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async () => {
    if (!currentEmployee) return;
    const confirm = window.confirm("Bạn có chắc chắn muốn xoá nhân viên này?");
    if (!confirm) return;

    try {
      await api.delete(`/business/employee/${currentEmployee.empId}`);
      message.success("Xoá nhân viên thành công");
      setCurrentEmployee(null);
      setSelectedRowKeys([]);
      fetchEmployees();
    } catch (err) {
      message.error("Không thể xoá nhân viên");
    }
  };

  const handleEdit = () => {
    if (currentEmployee) {
      navigate(`/editemployees/${currentEmployee.empId}`);
    }
  };

  const handleAdd = () => {
    navigate("/addemployees");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.empName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "Mã", dataIndex: "empId", key: "empId" },
    { title: "Tên", dataIndex: "empName", key: "empName" },
    { title: "Năm sinh", dataIndex: "empYearOfBirth", key: "empYearOfBirth" },
    { title: "Điện thoại", dataIndex: "empPhone", key: "empPhone" },
    {
      title: "Chức vụ",
      dataIndex: "empRole",
      key: "empRole",
      render: (role) => (role === "ADMIN" ? "Quản lý" : "Nhân viên"),
    },
  ];

  const rowSelection = {
    type: "radio",
    selectedRowKeys,
    onChange: (keys, selectedRows) => {
      setSelectedRowKeys(keys);
      setCurrentEmployee(selectedRows[0]);
    },
  };

  return (
    <div style={{ padding: "24px" }}>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/orders")}
        >
          Quay lại
        </Button>

        <Title level={3}>Danh sách nhân viên</Title>

        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Text strong>Tổng số nhân viên: </Text>
              {employees.filter((emp) => emp.empRole === "USER").length}
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Text strong>Tổng số quản lý: </Text>
              {employees.filter((emp) => emp.empRole === "ADMIN").length}
            </Card>
          </Col>
          <Col span={8}>
            <Input
              placeholder="🔍 Tìm kiếm theo tên"
              value={searchTerm}
              onChange={handleSearch}
              allowClear
            />
          </Col>
        </Row>

        <Table
          rowKey="empId"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredEmployees}
          pagination={{ pageSize: 8 }}
        />

        <Space>
          <Button
            icon={<DeleteOutlined />}
            danger
            disabled={!currentEmployee}
            onClick={handleDelete}
          >
            Xoá
          </Button>
          <Button
            icon={<EditOutlined />}
            disabled={!currentEmployee}
            onClick={handleEdit}
            type="primary"
          >
            Chỉnh sửa
          </Button>
          <Button
            icon={<PlusOutlined />}
            onClick={handleAdd}
            type="default"
            style={{ background: "#52c41a", color: "white" }}
          >
            Thêm Nhân Viên
          </Button>
        </Space>
      </Space>
    </div>
  );
};

export default EmployeeList;
