import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppRoutes = ({ isAuthenticated, onLogout }) => {
  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;