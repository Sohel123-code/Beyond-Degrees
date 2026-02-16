import React, { useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar, activeSection, setActiveSection }) => {
  const sidebarItems = [
    { id: 'home', label: 'Home' },
    { id: 'career-paths', label: 'Career Paths' },
    { id: 'skill-assessment', label: 'Skill Assessment' },
    { id: 'success-stories', label: 'Success Stories' },
    { id: 'courses', label: 'Courses & Training' },
    { id: 'mentorship', label: 'Mentorship' },
    { id: 'blog', label: 'Blog' },
    { id: 'faq', label: 'FAQ' }
  ];

  const handleSidebarClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    closeSidebar();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      ></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-title">Navigation</h3>
          <button className="sidebar-close" onClick={closeSidebar} aria-label="Close sidebar">
            ×
          </button>
        </div>
        <ul className="sidebar-menu">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => handleSidebarClick(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
