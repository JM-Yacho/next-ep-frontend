import { useState, useEffect } from 'react';
import './ProfileInput.css'

const profileNameStorageKey = 'profileName';
const submitTimeStorageKey = 'submitTime';
const tenSeconds = 10000;

interface ProfileInputProps {
  onProfileSubmit: (name: string) => void;
};

const ProfileInput: React.FC<ProfileInputProps> = ({ onProfileSubmit }) => {
  const [profileName, setProfileName] = useState('');

  useEffect(() => {
    const storedProfileName = localStorage.getItem(profileNameStorageKey);
    if (storedProfileName) setProfileName(storedProfileName);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileName(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // if profile name is empty, ignore
    if(!profileName) return

    let currTime = (new Date()).getTime();

    if(profileName === localStorage.getItem(profileNameStorageKey)) {
      let storedSubmitTime = localStorage.getItem(submitTimeStorageKey)
      if(storedSubmitTime && (currTime - Number(storedSubmitTime)) < tenSeconds) {     
        alert(`Please wait 10 seconds to resubmit ${profileName}`)
        return
      }
    }
    
    localStorage.setItem(profileNameStorageKey, profileName);
    localStorage.setItem(submitTimeStorageKey, currTime.toString());
    onProfileSubmit(profileName);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="profileName">Enter MAL Profile Name</label>
            <br/>
            <input
                id="profileName"
                type="text"
                value={profileName}
                onChange={handleChange}
                placeholder="Profile name"
                className='input-text'
            />
            <button type="submit" className='submit-button'>Submit</button>
        </form>      
    </div>
  );
};

export default ProfileInput;
