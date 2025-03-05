import React, { useState, useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { logout } from './services/api';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <AppRoutes isAuthenticated={isAuthenticated} onLogout={handleLogout} />
    </div>
  );
};

export default App;