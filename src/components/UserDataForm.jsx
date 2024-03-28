import React, { useState } from 'react';

const UserDataForm = () => {
  const [college, setCollege] = useState('');
  const [gpa, setGPA] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [interests, setInterests] = useState('');
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleInputChange = (event) => {
    switch (activeButton) {
      case 'college':
        setCollege(event.target.value);
        break;
      case 'gpa':
        setGPA(event.target.value);
        break;
      case 'fieldOfStudy':
        setFieldOfStudy(event.target.value);
        break;
      case 'interests':
        setInterests(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <button onClick={() => handleButtonClick('college')} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 mb-2">+ Add College</button>
      {activeButton === 'college' && (
        <input type="text" value={college} onChange={handleInputChange} />
      )}
      <br />
      <button onClick={() => handleButtonClick('gpa')} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 mb-2">+ Add GPA</button>
      {activeButton === 'gpa' && (
        <input type="text" value={gpa} onChange={handleInputChange} />
      )}
      <br />
      <button onClick={() => handleButtonClick('fieldOfStudy')} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 mb-2">+ Add Field of Study</button>
      {activeButton === 'fieldOfStudy' && (
        <input type="text" value={fieldOfStudy} onChange={handleInputChange} />
      )}
      <br />
      <button onClick={() => handleButtonClick('interests')} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 mb-2">+ Add Interests</button>
      {activeButton === 'interests' && (
        <input type="text" value={interests} onChange={handleInputChange} />
      )}
    </div>
  );
};

export default UserDataForm;
