import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';

const OtpForm = () => {
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleConfirmOtp = async () => {
    const enteredOtp = otp.join('');
    try {
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('OTP verified');
        navigate('/reset-password');
      } else {
        alert(result.error || 'Invalid OTP');
        setOtp(new Array(4).fill(''));
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Failed to verify OTP');
    }
  };

  const handleResendOtp = async () => {
    setTimer(60);
    try {
      const response = await fetch('http://localhost:5000/api/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('OTP resent to your email');
      } else {
        alert(result.error || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert('Failed to resend OTP');
    }
  };

  return (
    <div id="otp-form">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="otp-inputs">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e, index)}
              required
            />
          ))}
        </div>
        <div className="timer">{timer > 0 ? `Time remaining: ${timer}s` : 'Time is up'}</div>
        {timer > 0 ? (
          <button className="loginbutton" onClick={handleConfirmOtp}>Confirm OTP</button>
        ) : (
          <button className="loginbutton" onClick={handleResendOtp}>Resend OTP</button>
        )}
      </form>
    </div>
  );
};

export default OtpForm;
