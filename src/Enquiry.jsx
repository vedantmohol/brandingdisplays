import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Enquiry = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('Sending....');
    const formData = new FormData();

    formData.append('access_key', '2ee767f0-da2f-492a-bdab-fd378eac9f2a');
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('message', message);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult('Enquiry sent successfully.');
        alert('Enquiry sent successfully.');
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
        navigate('/');
      } else {
        console.log('Error', data);
        setResult(data.message || 'Failed to send the enquiry. Please try again.');
        alert(data.message || 'Failed to send the enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error sending enquiry:', error);
      setResult('Failed to send the enquiry. Please try again.');
      alert('Failed to send the enquiry. Please try again.');
    }
  };

  return (
    <div className='enquiryform'>
      <h2 className='enquiryhead'>Enquiry Form</h2>
      <form onSubmit={handleSubmit}>
        <div className='formitems'>
          <label className='label'>Enter Your Name</label>
          <input
            className='name'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div className='formitems'>
          <label className='label'>Enter Your Phone Number</label>
          <input
            className='phone'
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            required
          />
        </div>
        <div className='formitems'>
          <label className='label'>Enter Your Email Id</label>
          <input
            className='email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email ID"
            required
          />
        </div>
        <div className='formitems'>
          <label className='label'>How can we help you?</label>
          <textarea
            className='message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            required
          ></textarea>
        </div>
        <div className='enquirysubmit'>
          <button className='enquirybutton' type="submit">Submit</button>
        </div>
      </form>
      <span>{result}</span>
    </div>
  );
};

export default Enquiry;
