import axios from 'axios';

const testLogin = async () => {
    try {
        console.log('Sending login request...');
        const response = await axios.post('http://localhost:5000/auth/login', {
            email: 'tejeshwarorg@gmail.com',
            name: 'Tejeshwar'
        });
        console.log('Login Success:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Login Failed:', error.response.status, error.response.data);
        } else {
            console.error('Login Error:', error.message);
        }
    }
};

testLogin();
