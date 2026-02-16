import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            if (response.data.user) {
                localStorage.setItem('user_id', response.data.user.id);
                localStorage.setItem('user_name', response.data.user.user_name || 'User');
                localStorage.setItem('user_email', response.data.user.email);
                if (response.data.user.image) {
                    localStorage.setItem('user_photo', response.data.user.image);
                }
            }
        }
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Login failed';
    }
};

export const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            if (response.data.user) {
                localStorage.setItem('user_id', response.data.user.id);
                localStorage.setItem('user_name', response.data.user.user_name || name);
                localStorage.setItem('user_email', response.data.user.email);
                if (response.data.user.image) {
                    localStorage.setItem('user_photo', response.data.user.image);
                }
            }
        }
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Registration failed';
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    window.location.href = '/login';
};
