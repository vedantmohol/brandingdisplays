import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { AdminContext } from './AdminContext';
import './index.css';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) { 
      alert('Passwords do not match');
      return;
    }

    // Send new password to server
    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Password reset successfully');
        navigate('/admin');
      } else {
        alert(result.error || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password');
    }
  };

  return (
    <div id="reset-password-form">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button className="loginbutton" onClick={handleResetPassword}>Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
