import axios from 'axios';

const API_URL = 'http://localhost:3000/'; // Update to your actual API URL

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}auth/login`, { email, password });
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
      return token;
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}auth/register`, { name, email, password });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const logout = async () => {
  localStorage.removeItem('token');
  return true;
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};