import { useState, useEffect } from 'react';
import './ProfileInput.css'

const storedVarName = 'profileName';

interface ProfileInputProps {
  onProfileSubmit: (name: string) => void;
};

const ProfileInput: React.FC<ProfileInputProps> = ({ onProfileSubmit }) => {
  const [profileName, setProfileName] = useState('');

  useEffect(() => {
    const storedProfileName = localStorage.getItem(storedVarName);
    if (storedProfileName) setProfileName(storedProfileName);
  }, []);    

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileName(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem(storedVarName, profileName);
    onProfileSubmit(profileName);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="profileName">Enter MAL Profile Name:</label>
            <input
                id="profileName"
                type="text"
                value={profileName}
                onChange={handleChange}
                placeholder="Profile name"
            />
            <button type="submit">Submit</button>
        </form>      
    </div>
  );
};

export default ProfileInput;
