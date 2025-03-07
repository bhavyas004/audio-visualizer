import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api';
import '../styles/Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await signup(name, email, password);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup">
      <h2 className="text-center">Signup</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">Signup</button>
      </form>
    </div>
  );
};

export default Signup;