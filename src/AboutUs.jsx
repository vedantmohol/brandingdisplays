import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from './AdminContext';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const [data, setData] = useState({
    aboutTextAreaContent: '',
    aboutImage: '',
    aboutText: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleImageUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((result) => {
        setData((prevData) => ({ ...prevData, aboutImage: result.filePath }));
      });
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
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  const handleLogout = () => {
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <div className="about">
      <div className="aboutimage">
        {isAdmin ? (
          <div>
            <input type="file" onChange={(e) => handleImageUpload(e.target.files[0])} />
            {data.aboutImage && <img src={data.aboutImage} alt="About Us" className='imga' />}
          </div>
        ) : (
          data.aboutImage && <img src={data.aboutImage} alt="About Us" className='imga' />
        )}
      </div>
      <div className="abouttext">
        {isAdmin ? (
          <textarea
            value={data.aboutTextAreaContent}
            onChange={(e) => setData({ ...data, aboutTextAreaContent: e.target.value })}
          />
        ) : (
          <p>{data.aboutTextAreaContent}</p>
        )}
      </div>
      <div className="aboutmoretext">
        {isAdmin ? (
          <textarea
            value={data.aboutText}
            onChange={(e) => setData({ ...data, aboutText: e.target.value })}
          />
        ) : (
          <p>{data.aboutText}</p>
        )}
      </div>
      {isAdmin && (
        <div className='aboutadminbutton'> 
          <button className='adminformbuttons' onClick={handleSave}>Save</button>
          <button className='adminformbuttons' onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
