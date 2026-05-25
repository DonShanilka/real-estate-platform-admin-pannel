import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const authApi = {
  register: async (data: any) => {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  },

  login: async (data: any) => {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  },
};