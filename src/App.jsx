import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import AboutUs from './AboutUs';
import Portfolio from './Portfolio';
import Enquiry from './Enquiry';
import Footer from './Footer';
import AdminForm from './AdminForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import OtpForm from './OtpForm';
import ResetPasswordForm from './ResetPasswordForm';
import { AdminProvider, AdminContext } from './AdminContext';
import './index.css';

const App = () => {
  return (
    <AdminProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/admin" element={<AdminForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/otp" element={<OtpForm />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
        </Routes>
        <Footer />
        <AdminButton />
      </Router>
    </AdminProvider>
  );
};

const AdminButton = () => {
  const navigate = useNavigate();
  return (
    <button className="adminbutton" onClick={() => navigate('/admin')}>...</button>
  );
};

export default App;
