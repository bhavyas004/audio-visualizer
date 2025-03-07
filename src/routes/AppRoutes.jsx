import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Visualization from '../pages/Visualization';
import AudioVisualizer from '../pages/AudioVisualizer';
import AudioVisualizerOne from '../pages/AudioVisualizerOne';
import AudioVisualizerTwo from '../pages/AudioVisualizerTwo';
import AudioVisualizerThree from '../pages/AudioVisualizerThree';

const AppRoutes = ({ isAuthenticated, onLogout }) => {
  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/visualization" element={<Visualization />} />
        <Route path="/visualizer/waveform" element={<AudioVisualizer />} />
        <Route path="/visualizer/spectrum" element={<AudioVisualizerOne />} />
        <Route path="/visualizer/particles" element={<AudioVisualizerTwo />} />
        <Route path="/visualizer/geometric" element={<AudioVisualizerThree />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;