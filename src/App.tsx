import { useState, useMemo } from 'react';

import { fetchWatchListNextEps } from './api/Backend';
import ProfileInput from './components/ProfileInput';
import EpCalendar from './components/EpCalendar';
import type { NextEp } from './types/NextEp';
import './App.css';

function App() {
  const [nextEpsByDate, setNextEpsByDate] = useState<{[key: string]: NextEp[]}>({});
  const userLocale = useMemo(() => navigator.language || 'en-US', []);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleProfileSubmit = async (profileName: string) => {
    if(processing) {
      alert('Currently pulling eps...please wait');
      return;
    }
    setProcessing(true)
    const watchListNextEps = await fetchWatchListNextEps(profileName);
    if (watchListNextEps) {
      organizeEps(watchListNextEps);
    }
    else  {
      alert("No episodes retrieved");
      setNextEpsByDate({});
    }
    setProcessing(false);
  };

  const organizeEps = (watchListNextEps: NextEp[]) => {
    let nextEps: {[key: string]: NextEp[]} = {};

    watchListNextEps.forEach((ep) => {
      let airingDate = new Date(ep.airing_at * 1000).toLocaleDateString(userLocale);
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
        <ProfileInput onProfileSubmit={handleProfileSubmit}/>
      </div>
      <div>
        <EpCalendar userLocale={userLocale} nextEpsByDate={nextEpsByDate}/>
      </div>
    </div>
  );
}

export default App;
