import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = () => {
    if (newPassword === confirmPassword) {
      alert('Password reset successfully');
      navigate('/admin');
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div id="reset-password-form">
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" required />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
        <button className="loginbutton" onClick={handleResetPassword}>Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
