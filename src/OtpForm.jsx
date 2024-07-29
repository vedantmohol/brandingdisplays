import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OtpForm = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('https://brandingdisplays.onrender.com/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('OTP verified successfully');
        navigate('/reset-password');
      } else {
        alert(result.error || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Failed to verify OTP');
    }
  };

  return (
    <div id='otp-form'>
      <h2>Verify OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
    </div>
  );
};

export default OtpForm;
