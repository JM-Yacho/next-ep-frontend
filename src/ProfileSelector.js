import React, {useState} from 'react';
// import '../project.css';

const ProfileSelector = ({onProfileSelect}) => {
    const [profileName, setProfileName] = useState("");
  
    const onChangeProfileName = (event) => {
        setProfileName(event.target.value);
    }

    const onSubmit = (event) => {
        onProfileSelect(profileName);
        event.preventDefault();
    }

    return (
        <form onSubmit={onSubmit}>
            <label>
                MAL Profile Name:
                <input type="text" name="profileName" onChange={onChangeProfileName} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default ProfileSelector;
