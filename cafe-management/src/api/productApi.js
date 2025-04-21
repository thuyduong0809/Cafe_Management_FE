import axios from "axios";

const API_URL = "http://localhost:8081/myapp/api/business/products";

export const getAllProducts = async () => {
  const res = await axios.get(API_URL, { withCredentials: true });
  return res.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
  return res.data;
};

export const addProduct = async (data) => {
  const res = await axios.post(API_URL, data, { withCredentials: true });
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};
