// src/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const getUsers = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

const userService = {
  getUsers,
};

export default userService;
