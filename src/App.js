import React, {useState} from 'react';

import EpCalendar from './EpCalendar';
import { fetchNextEpisodes } from './Api';
import ProfileSelector from './ProfileSelector';

import './App.css';

function App() {
  const [animes, setAnime] = useState([]);

  const onProfileSelect = async (profileName) => {
      let animes = await fetchNextEpisodes(profileName);
      setAnime(animes);
  }

  return (
    <div className='App'>
      <div className='ProfileSelector'>
        <ProfileSelector onProfileSelect={onProfileSelect}/>
      </div>
      <div className='Calendar'>
        <EpCalendar animes={animes}/>
      </div>
    </div>
  );
}

export default App;
