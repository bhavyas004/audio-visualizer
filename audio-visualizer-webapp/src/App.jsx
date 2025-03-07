import React, { useState, useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';

const App = () => {

  /* useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []); */

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;