import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

const testAuth = async () => {
    const email = `test_${Date.now()}@example.com`;
    const password = 'password123';
    const name = 'Test User';

    console.log(`Testing with Email: ${email}`);

    // 1. Register (New User)
    try {
        console.log('1. Attempting Registration/First Login...');
        const res = await axios.post(`${API_URL}/login`, { email, password, name });
        console.log('   Registration Success:', res.status, res.data.user.email);
    } catch (error) {
        console.error('   Registration Failed:', error.response?.data || error.message);
    }

    // 2. Login (Existing User)
    try {
        console.log('2. Attempting Login (Existing User)...');
        const res = await axios.post(`${API_URL}/login`, { email, password });
        console.log('   Login Success:', res.status, res.data.message);
    } catch (error) {
        console.error('   Login Failed:', error.response?.data || error.message);
    }

    // 3. Invalid Password
    try {
        console.log('3. Attempting Invalid Password...');
        await axios.post(`${API_URL}/login`, { email, password: 'wrongpassword' });
        console.error('   Invalid Password Test Failed (Should have returned error)');
    } catch (error) {
        if (error.response?.status === 401) {
            console.log('   Invalid Password Test Passed: 401 Unauthorized');
        } else {
            console.error('   Invalid Password Test Failed:', error.response?.status, error.response?.data);
        }
    }
};

testAuth();
