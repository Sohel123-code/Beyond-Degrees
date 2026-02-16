import React, { useState, useEffect } from 'react';
import SiteNavbar from '../shared/SiteNavbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { supabase } from '../config/supabaseClient';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        education: '',
        interests: '',
        social_links: '',
        image: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                // Fetch full profile from backend
                const response = await axios.get('http://localhost:5000/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data) {
                    const socialData = response.data['Social Links'] || response.data.social_links;
                    setUser({
                        name: response.data.user_name || '',
                        email: response.data.email || '',
                        education: response.data.education || '',
                        interests: response.data.interests || '',
                        social_links: socialData ? (typeof socialData === 'string' ? socialData : JSON.stringify(socialData, null, 2)) : '',
                        image: response.data.image || ''
                    });

                    if (response.data.image) {
                        localStorage.setItem('user_photo', response.data.image);
                    }
                }
            } catch (error) {
                console.error('Failed to load profile from backend', error);
                // Fallback to local storage for basic info
                setUser(prev => ({
                    ...prev,
                    name: localStorage.getItem('user_name') || '',
                    email: localStorage.getItem('user_email') || ''
                }));
            } finally {
                setLoading(false);
            }

            // Direct Supabase Fetch for Image (Ensures persistence)
            const userId = localStorage.getItem('user_id');
            if (userId) {
                try {
                    const { data, error } = await supabase
                        .from('USERS')
                        .select('image')
                        .eq('id', userId)
                        .single();

                    if (error) {
                        console.error('Error fetching image from Supabase:', error);
                    } else if (data && data.image) {
                        setUser(prev => ({ ...prev, image: data.image }));
                        localStorage.setItem('user_photo', data.image);
                        // Update Navbar
                        window.dispatchEvent(new Event('storage'));
                    }
                } catch (err) {
                    console.error('Supabase fetch error:', err);
                }
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (limit to 500KB)
            if (file.size > 500 * 1024) {
                alert("File size exceeds 500KB. Please upload a smaller image.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setUser(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/auth/profile', {
                ...user,
                social_links: user.social_links
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessage('Profile updated successfully!');
            // Update local storage immediately for Navbar updates
            localStorage.setItem('user_name', user.name);
            if (user.image) {
                localStorage.setItem('user_photo', user.image);
            }

            // Optional: Dispatch a custom event if Navbar doesn't listen to storage changes automatically
            // But since we are likely doing a page transition or specific update, a reload might be needed 
            // strictly for the navbar if it's not reactive. 
            // However, React state in Navbar won't update automatically from localStorage.
            // A simple page reload or context would differ. For now, we assume user navigates.
            // Let's force a window event to help if possible, or just rely on the user navigating.
            window.dispatchEvent(new Event('storage'));

        } catch (error) {
            console.error('Error saving profile:', error);
            setMessage('Failed to save profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="profile-loading">Loading...</div>;

    return (
        <div className="profile-page">
            <SiteNavbar />
            <div className="profile-container">
                <div className="profile-grid">
                    {/* Left Sidebar */}
                    <aside className="profile-sidebar">
                        <div className="profile-card">
                            <div className="profile-avatar">
                                {user.image ? (
                                    <img src={user.image} alt="Profile" />
                                ) : (
                                    <div className="profile-avatar-placeholder">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                )}
                            </div>
                            <h2 className="profile-name">{user.name || 'User Name'}</h2>
                            <p className="profile-email">{user.email}</p>

                            <div className="profile-upload-section">
                                <label htmlFor="file-upload" className="btn btn--secondary upload-btn">
                                    Upload Photo
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                                <small className="upload-hint">Max 500KB</small>
                            </div>
                        </div>
                    </aside>

                    {/* Right Main Content */}
                    <main className="profile-main">
                        <div className="profile-card">
                            <div className="profile-header-tabs">
                                <h1>Edit Profile</h1>
                            </div>

                            {message && <div className={`profile-message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}

                            <form className="profile-form" onSubmit={handleSave}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Education</label>
                                    <textarea
                                        name="education"
                                        value={user.education}
                                        onChange={handleChange}
                                        placeholder="University, Major, Graduation Year..."
                                        className="form-textarea"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Interests</label>
                                    <textarea
                                        name="interests"
                                        value={user.interests}
                                        onChange={handleChange}
                                        placeholder="Coding, Design, Hiking..."
                                        className="form-textarea"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Social Links / Portfolio</label>
                                    <textarea
                                        name="social_links"
                                        value={user.social_links}
                                        onChange={handleChange}
                                        placeholder="LinkedIn: ..., GitHub: ..., Portfolio: ..."
                                        className="form-textarea"
                                        rows={4}
                                    />
                                    <small className="form-hint">Enter links separated by commas or new lines.</small>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="btn btn--primary save-btn" disabled={saving}>
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Profile;
