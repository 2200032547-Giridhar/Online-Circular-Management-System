import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/events',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const eventService = {
  createEvent: (data) => api.post('/create', data),
  getAllEvents: () => api.get('/'),
  getUserEvents: () => api.get('/my-events'),
  updateEvent: (id, data) => api.put(`/${id}`, data),
  deleteEvent: (id) => api.delete(`/${id}`),
};

export default eventService;
