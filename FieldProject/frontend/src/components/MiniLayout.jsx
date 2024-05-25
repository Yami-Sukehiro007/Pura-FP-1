import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const MiniLayout = ({ children }) => {
  const { userRole, name, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* App Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container-fluid">
          <span className="navbar-brand mx-auto h1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            MentorConnect.vnrvjiet
          </span>
          <div className="d-flex align-items-center">
            <span className="navbar-text me-3" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', color: 'white' }}>
              👋🏻 {name} ({userRole})
            </span>
            <button className="btn btn-outline-light" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1 p-3" style={{ marginTop: '64px', overflow: 'auto', height: 'calc(100vh - 64px)' }}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-2" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        @MentorConnect.vnrvjiet.
      </footer>
    </div>
  );
};

export default MiniLayout;
