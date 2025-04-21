import axios from "axios";

const BASE_URL = "http://localhost:8080/api/business/auth";

export const login = async (username, password) => {
  const res = await axios.post(
    `${BASE_URL}/login`,
    { username, password },
    { withCredentials: true }
  );
  return res.data;
};

export const introspect = async (token) => {
  const res = await axios.post(`${BASE_URL}/introspect`, { token });
  return res.data;
};
