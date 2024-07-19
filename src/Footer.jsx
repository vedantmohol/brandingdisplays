import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from './AdminContext';

const Footer = () => {
  const { isAdmin } = useContext(AdminContext);
  const [data, setData] = useState({
    footerHeading: '',
    footerMainContent: '',
    footerSubContent1: '',
    footerSubContent2: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleChange = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSave = () => {
    fetch('http://localhost:5000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json()).then(data => {
      if (data.message === 'Data saved successfully') {
        alert('Changes saved successfully.');
      } else {
        alert('Failed to save changes.');
      }
    });
  };

  return (
    <footer className='footer'>
      {isAdmin ? (
        <div>
          <input className="footer-heading-input"
            type="text"
            value={data.footerHeading}
            onChange={(e) => handleChange('footerHeading', e.target.value)}
          />
          <textarea className="footer-main-content-input"
            value={data.footerMainContent}
            onChange={(e) => handleChange('footerMainContent', e.target.value)}
          />
          <div className='footer-sub-content-inputs'>
            <textarea
              value={data.footerSubContent1}
              onChange={(e) => handleChange('footerSubContent1', e.target.value)}
            />
            <textarea
              value={data.footerSubContent2}
              onChange={(e) => handleChange('footerSubContent2', e.target.value)}
            />
          </div>
          <button className='adminformbuttons' onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h3 className="footer-heading">{data.footerHeading}</h3>
          <p className="footer-main-content"> {data.footerMainContent}</p>
          <div className="footer-sub-contents">
            <p className="footer-sub-content1">{data.footerSubContent1}</p>
            <p className="footer-sub-content2">{data.footerSubContent2}</p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
