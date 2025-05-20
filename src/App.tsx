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
    const watchListNextEps = await fetchWatchListNextEps(profileName);
    if (watchListNextEps) {
      if (watchListNextEps.length === 0) {
        alert("No new episodes found for this profile");
        setNextEpsByDate({});
      }
      else {
        organizeEps(watchListNextEps);
      }
    }
    else  {
      alert("Error: no episodes retrieved");
      setNextEpsByDate({});
    }
    setIsProcessing(false);
  };

  const organizeEps = (watchListNextEps: NextEp[]) => {
    const nextEps: {[key: string]: NextEp[]} = {};

    watchListNextEps.forEach((ep) => {
      const airingDate = new Date(ep.airing_at * 1000).toLocaleDateString('en-US');
      if(airingDate in nextEps) {
        nextEps[airingDate].push(ep);
      }
      else {
        nextEps[airingDate] = [ep];
      }
    });

    setNextEpsByDate(nextEps);
  }

  return (
    <div className="App" style={{ display: "grid", placeItems: "center" }}>
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
