import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from './AdminContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);//hook to subscribe to context changes
  const [data, setData] = useState({
    homeTextAreaContent: '',
    homeImages: ['', '', ''],
    homeTexts: ['', '', '']
  });//declares a state variable data and a function setData to update it, using the useState hook. 
  const navigate = useNavigate();//hook used to programmatically navigate between different routes.

  useEffect(() => {// hook to perform side effects in functional components(data fetching)
    fetch('https://brandingdisplays.onrender.com/api/data')//GET request
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);//effect runs only once after the initial render

  const handleImageUpload = (index, file) => {
    const formData = new FormData();
    formData.append('file', file);//appends the image file to the FormData object under the key 'file'

    fetch('https://brandingdisplays.onrender.com/api/upload', {
      method: 'POST',
      body: formData//sets the body of the request to the formData object containing the file to be uploaded.
    })
      .then((response) => response.json())
      .then((result) => {//the JSON object returned from the server, which includes the file path of the uploaded image.
        const newImages = [...data.homeImages];//creates a shallow copy of the homeImages array from the data state.
        newImages[index] = result.filePath;//updates copied newImages array at specified index with new file path of uploaded image
        setData((prevData) => ({ ...prevData, homeImages: newImages }));//updates the data state with the new homeImages
      });
  };

  const handleTextChange = (index, value) => {
    const newTexts = [...data.homeTexts];
    newTexts[index] = value;
    setData((prevData) => ({ ...prevData, homeTexts: newTexts }));
  };

  const handleSave = () => {
    fetch('https://brandingdisplays.onrender.com/api/data', {//The endpoint where the data is being sent
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),//Converts data object to a JSON string to be sent as the body of the request.
    }).then(response => response.json()).then(data => {
      if (data.message === 'Data saved successfully') {
        alert('Changes saved successfully.');
      } else {
        alert('Failed to save changes.');
      }
    });
  };

  const handleLogout = () => {
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <div className="home">
      <div className="TextArea">
        {isAdmin ? (
          <textarea value={data.homeTextAreaContent} onChange={(e) => setData((prevData) => ({ ...prevData, homeTextAreaContent: e.target.value }))} />
        ) : (
          <p>{data.homeTextAreaContent}</p>
        )}
      </div>
      <div className="main-image">
        {data.homeImages[0] && (
          <div className='innerimg'>
            {isAdmin ? (
              <div className='homeimg'>
                <input type="file" onChange={(e) => handleImageUpload(0, e.target.files[0])} />
                <img src={data.homeImages[0]} alt="main-img" className='imga'/>
              </div>
            ) : (
              <img src={data.homeImages[0]} alt="main-img" className='imga'/>
            )}
          </div>
        )}
      </div>
      <div className="textbelowimage">
        <div className='innertext'>
          {isAdmin ? (
            <textarea value={data.homeTexts[0]} onChange={(e) => handleTextChange(0, e.target.value)} />
          ) : (
            <p>{data.homeTexts[0]}</p>
          )}
        </div>
      </div>
      <div className="side-images">
        <div className='left-img'>
          {isAdmin ? (
            <div>
              <input type="file" onChange={(e) => handleImageUpload(1, e.target.files[0])} />
              <img src={data.homeImages[1]} alt="left-img" className='imga' />
            </div>
          ) : (
            <img src={data.homeImages[1]} alt="left-img" className='imga'/>
          )}
        </div>
        <div className='right-img'>
          {isAdmin ? (
            <div>
              <input type="file" onChange={(e) => handleImageUpload(2, e.target.files[0])} />
              <img src={data.homeImages[2]} alt="right-img" className='imga'/>
            </div>
          ) : (
            <img src={data.homeImages[2]} alt="right-img" className='imga'/>
          )}
        </div>
      </div>
      <div className="side-texts">
        <div className='left-text'>
          {isAdmin ? (
            <textarea value={data.homeTexts[1]} onChange={(e) => handleTextChange(1, e.target.value)} />
          ) : (
            <p>{data.homeTexts[1]}</p>
          )}
        </div>
        <div className='right-text'>
          {isAdmin ? (
            <textarea value={data.homeTexts[2]} onChange={(e) => handleTextChange(2, e.target.value)} />
          ) : (
            <p>{data.homeTexts[2]}</p>
          )}
        </div>
      </div>
      {isAdmin && (
        <div >
          <button className='adminformbuttons' onClick={handleSave}>Save</button>
          <button className='adminformbuttons' onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Home;
