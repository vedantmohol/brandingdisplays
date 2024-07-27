import React, { useState, useContext } from 'react';
import { AdminContext } from './AdminContext';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

const AdminForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === 'prasanna' && password === pass) {
      setIsAdmin(true);
      navigate('/');
    } else {
      alert('Incorrect credentials');
    }
  };

  return (
    <div id="admin-form">
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="loginbutton" type="submit">Login</button>
      </form>
      <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
    </div>
  );
};

export default AdminForm;
