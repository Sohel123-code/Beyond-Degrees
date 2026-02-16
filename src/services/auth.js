import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const login = async (email, password, name) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password, name });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            // Store user details for UI
            if (response.data.user) {
                localStorage.setItem('user_name', response.data.user.user_name || name || 'User');
                localStorage.setItem('user_email', response.data.user.email);
            }
        }
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Login failed';
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    window.location.href = '/login';
};
