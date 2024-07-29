import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await fetch('https://brandingdisplays.onrender.com/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'vedantmohol18@gmail.com' }), 
      });

      navigate('/otp'); // Directly navigate to OTP page

    } catch (error) {
      // Even if there's an error, still navigate to the OTP page
      console.error('Error sending OTP:', error);
      navigate('/otp');
    }
  };

  return (
    <div id="forgot-password-form">
      <h2>Forgot Password</h2>
      {/* <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      /> */}
      <button className="send-otp-button" onClick={handleSendOtp}>Send OTP</button>
    </div>
  );
};

export default ForgotPasswordForm;
