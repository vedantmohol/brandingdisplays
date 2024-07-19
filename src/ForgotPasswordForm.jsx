import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const email = 'vedantmohol18@gmail.com'; 
  const handleSendOtp = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('OTP sent to your email');
        navigate('/otp', { state: { email } });
      } else {
        alert(result.error || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP');
    }
  };

  return (
    <div id="forgot-password-form">
      <form onSubmit={(e) => e.preventDefault()}>
        <button className="loginbutton" onClick={handleSendOtp}>Send OTP</button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
