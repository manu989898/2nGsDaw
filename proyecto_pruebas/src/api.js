import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Cambia esto si tu servidor Laravel usa otro puerto o URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
