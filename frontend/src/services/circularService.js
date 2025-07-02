import axios from 'axios';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api/circulars', // Base URL focused on circulars
  // withCredentials: true, // Uncomment if backend uses cookies for authentication
});

// Add Authorization header interceptor to include token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const circularService = {
  // Create new circular with file upload support (Admin)
  createCircular: (formData) => {
    return api.post('/admin/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Update circular status (Admin)
  updateCircularStatus: (id, status) => {
    return api.put(`/admin/update/${id}`, { status });
  },

  // Update circular with arbitrary fields (Admin)
  updateCircular: (id, updateData) => {
    return api.put(`/admin/update/${id}`, updateData);
  },

  // Get all circulars (Admin overview)
  getAllCirculars: () => {
    return api.get('/all');
  },



  // Get circular details by ID (any authenticated user)
  getCircularById: (id) => {
    return api.get(`/${id}`);
  },

  // Delete circular by ID (Admin)
  deleteCircular: (id) => {
    return api.delete(`/admin/delete/${id}`);
  },

  // Search circulars with query parameters (any authenticated user)
  searchCirculars: (params) => {
    // Example params: { department: 'Sports', type: 'incoming' }
    return api.get('/search', { params });
  },
};

export default circularService;
