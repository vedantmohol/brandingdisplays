import React, { useState, useContext, useEffect } from 'react';
import { AdminContext } from './AdminContext';
import './index.css';

const EditableContent = ({ dataKey, content, onSave }) => {
  const { isAdmin } = useContext(AdminContext);
  const [editableContent, setEditableContent] = useState(content);

  useEffect(() => {
    setEditableContent(content);
  }, [content]);

  const handleChange = (e) => {
    setEditableContent(e.target.value);
  };

  const handleSave = () => {
    onSave(dataKey, editableContent);
  };

  return (
    <div className='adminside'>
      {isAdmin ? (
        <>
          <textarea className='adminsidetext' value={editableContent} onChange={handleChange}></textarea>
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
};

export default EditableContent;
