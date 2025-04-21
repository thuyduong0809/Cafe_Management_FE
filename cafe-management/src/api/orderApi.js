import axios from "axios";

const API_BASE = "http://localhost:8081/myapp/api/business/order";

export const createOrder = async (orderData) => {
  const res = await axios.post(API_BASE, orderData, { withCredentials: true });
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`, { withCredentials: true });
  return res.data;
};

export const getOrderByDate = async (date) => {
  const res = await axios.get(`${API_BASE}/date?date=${date}`, {
    withCredentials: true,
  });
  return res.data;
};
