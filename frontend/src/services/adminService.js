import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Include cookies if needed (optional)
});

const adminService = {
  getUserCounts: () => API.get('/admin/users/counts'),
  getCircularCount: () => API.get('/admin/circulars/count'),
  getEventCount: () => API.get('/admin/events/count'),
};

export default adminService;
