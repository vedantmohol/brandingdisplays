import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from './AdminContext';
import { useNavigate } from 'react-router-dom';

const Portfolio = () => {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const [data, setData] = useState({
    portfolioTextAreaContent: '',
    portfolioItems: Array(8).fill({ extraText: '', text: '', image: '' }) // Array with 8 rows
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://brandingdisplays.onrender.com/api/data')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleImageUpload = (index, file) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('https://brandingdisplays.onrender.com/api/upload', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((result) => {
        const newItems = [...data.portfolioItems];
        newItems[index].image = result.filePath;
        setData((prevData) => ({ ...prevData, portfolioItems: newItems }));
      });
  };

  const handleItemChange = (index, key, value) => {
    const newItems = [...data.portfolioItems];
    newItems[index][key] = value;
    setData((prevData) => ({ ...prevData, portfolioItems: newItems }));
  };

  const handleSave = () => {
    fetch('https://brandingdisplays.onrender.com/api/data', {
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentScroll = window.scrollY;
        const nextScroll = currentScroll + window.innerHeight;
        window.scrollTo({
          top: nextScroll,
          behavior: 'smooth',
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentScroll = window.scrollY;
        const prevScroll = currentScroll - window.innerHeight;
        window.scrollTo({
          top: prevScroll,
          behavior: 'smooth',
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='portfolio'>
      <div className="portfoliotext">
        {isAdmin ? (
          <textarea value={data.portfolioTextAreaContent} onChange={(e) => setData((prevData) => ({ ...prevData, portfolioTextAreaContent: e.target.value }))} />
        ) : (
          <p>{data.portfolioTextAreaContent}</p>
        )}
      </div>
      <div className="portfolio-grid">
        {data.portfolioItems.map((item, index) => (
          <div key={index} className={`portfolio-item ${index % 2 === 1 ? 'reverse' : ''}`}>
            <div className="portfolio-item-content">
              {isAdmin ? (
                <>
                  <textarea className="extra-textarea" value={item.extraText} onChange={(e) => handleItemChange(index, 'extraText', e.target.value)} />
                  <textarea value={item.text} onChange={(e) => handleItemChange(index, 'text', e.target.value)} />
                </>
              ) : (
                <>
                  <p className="extra-textarea">{item.extraText}</p>
                  <p>{item.text}</p>
                </>
              )}
            </div>
            <div>
              {isAdmin ? (
                <div>
                  <input type="file" onChange={(e) => handleImageUpload(index, e.target.files[0])} />
                  {item.image && <img src={item.image} alt={`portfolio-${index}`} />}
                </div>
              ) : (
                item.image && <img src={item.image} alt={`portfolio-${index}`} />
              )}
            </div>
          </div>
        ))}
      </div>
      {isAdmin && (
        <div>
          <button className='adminformbuttons' onClick={handleSave}>Save</button>
          <button className='adminformbuttons' onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
