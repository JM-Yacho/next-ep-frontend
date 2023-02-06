import React, {useState} from 'react';

import EpCalendar from './EpCalendar';
import { fetchWatchListNextEps } from './Api';
import ProfileSelector from './ProfileSelector';

import './App.css';

function App() {
  const [nextEpsByDate, setNextEpsByDate] = useState([]);

  const onProfileSelect = async (profileName) => {
    let nextEpsByDate = {};
    let watchListNextEps = await fetchWatchListNextEps(profileName);

    watchListNextEps.forEach((anime, i) => {
      let airingDate = (new Date(anime.nextEp.airingAt * 1000)).toISOString().split('T')[0];
      if(airingDate in nextEpsByDate) {
        nextEpsByDate[airingDate].push(anime);
      }
      else {
        nextEpsByDate[airingDate] = [anime];
      }
    });

    setNextEpsByDate(nextEpsByDate);
  }

  return (
    <div className='App'>
      <div className='ProfileSelector'>
        <ProfileSelector onProfileSelect={onProfileSelect}/>
      </div>
      <div className='Calendar'>
        <EpCalendar nextEpsByDate={nextEpsByDate}/>
      </div>
    </div>
  );
}

export default App;
