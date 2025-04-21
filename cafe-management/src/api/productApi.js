import api from "../utils/api";

const API_URL = "/business/products";

export const getAllProducts = async () => {
  const res = await api.get(API_URL);
  return res.data;
};

export const deleteProduct = async (id) => {
  await api.delete(`${API_URL}/${id}`);
};

export const getProductById = async (id) => {
  const res = await api.get(`${API_URL}/${id}`);
  return res.data;
};

export const addProduct = async (data) => {
  const res = await api.post(API_URL, data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await api.put(`${API_URL}/${id}`, data);
  return res.data;
};
