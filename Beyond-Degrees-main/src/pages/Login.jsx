import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/auth';
import '../styles.css';

const CapIcon = (props) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path
            d="M12 3 1.5 8.4 12 13.8 22.5 8.4 12 3Z"
            fill="#2F5FA7"
            opacity="0.95"
        />
        <path
            d="M5.5 10.2v4.6c0 1.8 3 3.6 6.5 3.6s6.5-1.8 6.5-3.6v-4.6l-6.5 3.3-6.5-3.3Z"
            fill="#2F5FA7"
            opacity="0.75"
        />
        <path
            d="M22.5 8.4v6.1"
            stroke="#2F5FA7"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.8"
        />
    </svg>
);

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
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
            if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
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

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setMessage('');
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            {/* Left Side - Image */}
            <div style={{
                flex: '1',
                backgroundImage: 'url(/assets/layout.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'none', // Hide on mobile
                '@media (min-width: 768px)': { display: 'block' } // Logic handled via CSS class strictly, but inline for now we use a media query trick or just inline style
            }} className="login-image-side">
                <style>{`
                    .login-image-side { display: none; }
                    @media (min-width: 900px) { .login-image-side { display: block; flex: 1.2; } }
                `}</style>
            </div>

            {/* Right Side - Form */}
            <div style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#ffffff',
                position: 'relative',
                padding: '2rem'
            }}>
                {/* Logo Top Left */}
                <div style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CapIcon />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px', color: '#14213d', display: 'flex', gap: '6px', alignItems: 'baseline' }}>
                        <span style={{ fontWeight: 800 }}>Beyond</span>
                        <span style={{ fontStyle: 'italic', fontWeight: 500, color: '#42506a', fontSize: '18px' }}>the degree</span>
                    </span>
                </div>

                <div className="login-box" style={{
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', borderBottom: '1px solid #eee' }}>
                        <button
                            onClick={() => setIsLogin(true)}
                            style={{
                                flex: 1,
                                padding: '1rem',
                                background: 'none',
                                border: 'none',
                                borderBottom: isLogin ? '2px solid #333' : '2px solid transparent',
                                fontWeight: isLogin ? 'bold' : 'normal',
                                color: isLogin ? '#333' : '#888',
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            style={{
                                flex: 1,
                                padding: '1rem',
                                background: 'none',
                                border: 'none',
                                borderBottom: !isLogin ? '2px solid #333' : '2px solid transparent',
                                fontWeight: !isLogin ? 'bold' : 'normal',
                                color: !isLogin ? '#333' : '#888',
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}
                        >
                            Sign Up
                        </button>
                    </div>

                    <h2 style={{ marginBottom: '0.5rem', color: '#333', fontWeight: 'bold', fontSize: '2rem' }}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p style={{ marginBottom: '2rem', color: '#666' }}>
                        {isLogin ? 'Login to access your dashboard' : 'Join us to start your journey'}
                    </p>

                    {message && <div style={{ padding: '10px', background: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '1rem' }}>{message}</div>}
                    {error && <div style={{ padding: '10px', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '1rem' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontSize: '0.95rem', fontWeight: '600' }}>Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required={!isLogin}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '16px',
                                        outline: 'none',
                                        backgroundColor: '#f8fafc',
                                        transition: 'all 0.2s'
                                    }}
                                />
                            </div>
                        )}

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
                                    border: '1px solid #e2e8f0',
                                    fontSize: '16px',
                                    outline: 'none',
                                    backgroundColor: '#f8fafc'
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
                                    border: '1px solid #e2e8f0',
                                    fontSize: '16px',
                                    outline: 'none',
                                    backgroundColor: '#f8fafc'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: '#2563eb',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                opacity: loading ? 0.8 : 1,
                                boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)'
                            }}
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Login' : 'create account')}
                        </button>
                        <p style={{ marginTop: '1.5rem', color: '#64748b', fontSize: '0.95rem', cursor: 'pointer' }} onClick={toggleMode}>
                            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
