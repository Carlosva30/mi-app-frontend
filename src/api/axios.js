import axios from 'axios';

const instancia = axios.create({
  baseURL: 'https://backend-nowservices.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir token automáticamente
instancia.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instancia;
