import React, { useMemo, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout as sessionLogout } from '../services/auth';
import './SiteNavbar.css';

const CapIcon = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
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

const SiteNavbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: localStorage.getItem('user_name'),
    photo: localStorage.getItem('user_photo')
  });

  // Update state when local storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUserInfo({
        name: localStorage.getItem('user_name'),
        photo: localStorage.getItem('user_photo')
      });
    };

    // Listen for custom 'storage' events (from same window) and native 'storage' events (from other tabs)
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    sessionLogout();
    setUserInfo({ name: null, photo: null });
    setOpen(false);
    // sessionLogout usually redirects, but if not:
    // navigate('/login'); 
  };

  const links = useMemo(
    () => [
      { label: 'Home', to: '/' },
      { label: 'Career Paths', to: '/career-paths' },
      { label: 'Concept Hub', to: '/concept-hub' },
      { label: 'Career Advice', to: '/#career-advice' },
      { label: 'Resources', to: '/#resources' },
      { label: 'About', to: '/#about' },
    ],
    []
  );

  return (
    <nav className="nav">
      <div className="container nav__inner">
        <Link className="nav__brand" to="/" onClick={() => setOpen(false)}>
          <CapIcon />
          <span className="nav__brandText">
            <span className="nav__brandBold">Beyond</span>{' '}
            <span className="nav__brandScript">the degree</span>
          </span>
        </Link>

        <div className="nav__links" role="navigation" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
              to={l.to}
              end={l.to === '/'}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="nav__right">
          {userInfo.name ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link to="/profile" title={userInfo.name || 'Profile'} style={{ display: 'flex', alignItems: 'center' }}>
                {userInfo.photo ? (
                  <img
                    src={userInfo.photo}
                    alt={userInfo.name}
                    style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #2F5FA7',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ) : (
                  <div style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #cbd5e1',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: '#475569'
                  }}
                    title="View Profile"
                  >
                    {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : '👤'}
                  </div>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="nav__link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '600' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link className="nav__link" to="/login" style={{ marginRight: '1rem', fontWeight: '600' }}>
                Login
              </Link>
              <Link className="btn btn--primary nav__cta" to="/career-paths">
                Get Started
              </Link>
            </>
          )}
          <button
            className="nav__hamburger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`navMobile ${open ? 'navMobile--open' : ''}`}>
        <div className="container navMobile__inner">
          {links.map((l) => (
            <Link key={l.to} className="navMobile__link" to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          {userInfo.name ? (
            <button className="navMobile__link" onClick={handleLogout} style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '500', color: '#333', padding: '1rem 0', width: '100%' }}>
              Logout
            </button>
          ) : (
            <Link className="navMobile__link" to="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          )}
          <Link className="btn btn--primary navMobile__cta" to="/career-paths" onClick={() => setOpen(false)}>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SiteNavbar;

