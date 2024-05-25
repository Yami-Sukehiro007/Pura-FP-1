import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Layout.css'; // Custom CSS file

const Sidebar = ({ handleLogout, user, toggleTheme }) => {
  return (
    <div className={`d-flex flex-column sidebar ${user.isDarkMode ? '' : 'light'}`}>
      <div className="toggle-theme">
        <label className="switch">
          <input type="checkbox" checked={user.isDarkMode} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="text-center mb-4">
        <img src="https://i.imgur.com/bqAB7QJ.png" alt="Logo" style={{ width: '50px', height: '50px', background: 'white', borderRadius: '15px', marginRight: '1em' }} />
        <span className="h3">MentorConnect</span>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/attendance" className="nav-link">
            <i className="bi bi-calendar-check"></i>
            Attendance
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/approvals" className="nav-link">
            <i className="bi bi-check2-circle"></i>
            Approvals
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/schedule-meetings" className="nav-link">
            <i className="bi bi-calendar2-plus"></i>
            Schedule Meetings
          </Link>
        </li>
      </ul>
      <div className="profile-section">
        <img src="https://i.imgur.com/ov44WOb.png" alt="Profile" width="50px" height="40px" />
        <div className="profile-info">
          <div className="name">Vatte Vijaya Bhaskara Reddy</div>
          <div className="email">vatte@gmail.com</div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  const { userRole, name, logout } = useAuth();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const user = {
    isDarkMode: isDarkMode,
    name: 'Nina Ergemia',
    email: 'nina_erg@ergemia.com'
  };

  return (
    <div className="d-flex">
      <Sidebar handleLogout={handleLogout} user={user} toggleTheme={toggleTheme} />
      <div className="d-flex flex-column flex-grow-1 min-vh-100" style={{ marginLeft: '300px' }}>
        {/* Main Content */}
        <main className="flex-grow-1 p-3" style={{ overflow: 'auto', marginTop: '56px' }}>
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-light text-center py-3">
          &copy; MentorConnect
        </footer>
      </div>
    </div>
  );
};

export default Layout;