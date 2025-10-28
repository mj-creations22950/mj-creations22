import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001/api';

// Set up axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Services API
export const servicesAPI = {
  getAll: (params) => api.get('/services', { params }),
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
};

// Cart API
export const cartAPI = {
  get: () => api.get('/cart'),
  addItem: (item) => api.post('/cart/items', item),
  removeItem: (serviceId) => api.delete(`/cart/items/${serviceId}`),
  clear: () => api.delete('/cart'),
};

// Orders API
export const ordersAPI = {
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, null, { params: { status } }),
};

// Addresses API
export const addressesAPI = {
  getAll: () => api.get('/addresses'),
  create: (data) => api.post('/addresses', data),
  update: (id, data) => api.put(`/addresses/${id}`, data),
  delete: (id) => api.delete(`/addresses/${id}`),
};

// Quotes API
export const quotesAPI = {
  request: (data) => api.post('/quotes/request', data),
  getAll: () => api.get('/quotes'),
  getById: (id) => api.get(`/quotes/${id}`),
};

// Appointments API
export const appointmentsAPI = {
  create: (data) => api.post('/appointments', data),
  getAll: () => api.get('/appointments'),
};

// Payments API
export const paymentsAPI = {
  createStripeCheckout: (orderId, originUrl) => 
    api.post('/payments/stripe/checkout', null, { 
      params: { order_id: orderId, origin_url: originUrl } 
    }),
  getStripeStatus: (sessionId) => 
    api.get(`/payments/stripe/status/${sessionId}`),
};

// Reviews API
export const reviewsAPI = {
  create: (data) => api.post('/reviews', data),
  getAll: (limit = 50) => api.get('/reviews', { params: { limit } }),
};

// Notifications API
export const notificationsAPI = {
  getAll: () => api.get('/notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
};

// Chat API
export const chatAPI = {
  sendMessage: (message) => api.post('/chat/messages', { message }),
  getMessages: () => api.get('/chat/messages'),
};

// Photos API
export const photosAPI = {
  upload: (formData) => api.post('/photos/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getAll: () => api.get('/photos'),
};

// Admin API
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getAllUsers: () => api.get('/admin/users'),
  getAllOrders: () => api.get('/admin/orders'),
  getAllAppointments: () => api.get('/admin/appointments'),
};

export default api;
