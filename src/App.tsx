import { useState, useMemo } from 'react';

import { fetchWatchListNextEps } from './api/Backend';
import ProfileInput from './components/ProfileInput';
import EpCalendar from './components/EpCalendar';
import type { NextEp } from './types/NextEp';
import './App.css';

function App() {
  const [nextEpsByDate, setNextEpsByDate] = useState<{[key: string]: NextEp[]}>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const userLocale = navigator.language || 'en-US';

  const handleProfileSubmit = async (profileName: string) => {
    if(isProcessing) {
      alert('Currently pulling eps...please wait');
      return;
    }
    setIsProcessing(true);
    setNextEpsByDate({});
    const watchListNextEps = await fetchWatchListNextEps(profileName);
    if (watchListNextEps) {
      if (watchListNextEps.length === 0) {
        alert(`No new episodes found for profile: ${profileName}`);
      }
      else {
        setNextEpsByDate(sortNextEps(watchListNextEps));
      }
    }
    else  {
      alert('Error: failed to fetch next episodes. Please check the profile name and try again.');
    }
    setIsProcessing(false);
  };

  const sortNextEps = (rawNextEps: NextEp[]) => {
    const sortedNextEps: {[key: string]: NextEp[]} = {};

    rawNextEps.forEach((nextEp) => {
      const airingDate = new Date(nextEp.airing_at * 1000).toLocaleDateString('en-US');
      if(airingDate in sortedNextEps) {
        sortedNextEps[airingDate].push(nextEp);
      }
      else {
        sortedNextEps[airingDate] = [nextEp];
      }
    });

    return sortedNextEps;
  }

  return (
    <div className='App' style={{ display: 'grid', placeItems: 'center' }}>
      <div>
        <ProfileInput isProcessing={isProcessing} onProfileSubmit={handleProfileSubmit}/>
      </div>
      <div>
        <EpCalendar userLocale={userLocale} nextEpsByDate={nextEpsByDate}/>
      </div>
    </div>
  );
}

export default App;
