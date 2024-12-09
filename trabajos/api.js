// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // Cambia esta URL por la de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default api;
