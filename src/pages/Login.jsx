import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import '../styles.css';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await login(email, password, name);
            setMessage('Success! Redirecting...');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#ffffff', // White background as requested
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <div className="login-box" style={{
                background: '#ffffff',
                padding: '3rem',
                borderRadius: '16px',
                border: '1px solid #eee', // Adding subtle border since bg is white
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                width: '100%',
                maxWidth: '420px',
                textAlign: 'center',
                transition: 'transform 0.3s ease'
            }}>
                <h2 style={{ marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>Welcome Back</h2>
                <p style={{ marginBottom: '2rem', color: '#666' }}>Login to access modules</p>

                {message && <div style={{ padding: '10px', background: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '1rem' }}>{message}</div>}
                {error && <div style={{ padding: '10px', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '1rem' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontSize: '0.95rem', fontWeight: '600' }}>Full Name <span style={{ fontWeight: 'normal', color: '#888', fontSize: '0.85rem' }}>(Required for new users)</span></label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.3s',
                                backgroundColor: '#f9f9f9'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontSize: '0.95rem', fontWeight: '600' }}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                fontSize: '16px',
                                outline: 'none',
                                backgroundColor: '#f9f9f9'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontSize: '0.95rem', fontWeight: '600' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                fontSize: '16px',
                                outline: 'none',
                                backgroundColor: '#f9f9f9'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: '#333', // Dark ergonomic button
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'opacity 0.2s',
                            opacity: loading ? 0.8 : 1,
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                    >
                        {loading ? 'Processing...' : 'Login / Register'}
                    </button>
                    <p style={{ marginTop: '1rem', color: '#888', fontSize: '0.9rem' }}>
                        New here? Just enter your details above to create an account.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
