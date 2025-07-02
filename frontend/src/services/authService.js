// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};

const register = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

// Assign object to a variable before export
const authService = {
  login,
  register,
};

export default authService;
