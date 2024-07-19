import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from './images/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <img src={logo} alt="Logo" className="logo" />
            <div className={`links ${isOpen ? 'active' : ''}`}>
                <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
                <Link to="/portfolio" onClick={() => setIsOpen(false)}>Product</Link>
                <Link to="/enquiry" onClick={() => setIsOpen(false)}>Enquiry</Link>
            </div>
            <button className="toggle-button" onClick={toggleMenu}>
                &#9776;
            </button>
        </nav>
    );
}

export default Navbar;
