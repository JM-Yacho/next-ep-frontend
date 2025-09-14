import { useState, useMemo, useCallback } from 'react';
// import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

import type { NextEp } from '../types/NextEp';
import './EpCalendar.css';

interface EpCalendarProps {
  userLocale: string
  nextEpsByDate: {[key: string]: NextEp[]};
};

interface CalendarTileProperties {
  date: Date;
  view: 'month' | 'year' | 'decade' | 'century';
};

const tileStyle: React.CSSProperties = {
  padding: '0.3em',
  width: '120%',
  height: '120%',
  objectFit: 'contain',
  transition: 'transform .1s ease-in-out'
};  

const EpCalendar: React.FC<EpCalendarProps> = ({ userLocale, nextEpsByDate }) => {
  const [currDate, setCurrDate] = useState(new Date());

  const tileContent = useCallback(({ date, view }: CalendarTileProperties) => {
    if (Object.keys(nextEpsByDate).length === 0) {
      return null
    }

    const epEntries: React.ReactNode[] = [];
    const dayOfMonth = date.toLocaleDateString('en-US');

    if(dayOfMonth in nextEpsByDate) {
      nextEpsByDate[dayOfMonth].forEach((ep) => {
        const airingTimeAndZone = new Date(ep.airing_at * 1000).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        });
        const title = ep.title_english || ep.title_romaji;      

        epEntries.push(
          <div
            key={ep.mal_id}
            style={tileStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <img src={ep.image_url} alt={`image of ${title}`} width='100%'/>
            {title}
            <br />
            Ep {ep.num}
            <br />
            {airingTimeAndZone}
          </div>
        );
      })
    }

    return epEntries
  }, [nextEpsByDate, userLocale, tileStyle]);
  
  return (
    <div>
      <Calendar
        value={currDate}
        locale={userLocale}
        tileContent={tileContent}       
      />
    </div>
  );
};

export default EpCalendar;
