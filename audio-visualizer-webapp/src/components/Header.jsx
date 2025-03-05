import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header>
      <div className="title">
        <img src="/logo.png" alt="Audio Visualizer" height="50" width="50" />
        Audio Visualizer</div>
      <nav>
        {isAuthenticated ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;