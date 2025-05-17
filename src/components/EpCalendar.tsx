import { useState, useMemo, useEffect } from 'react';
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

const EpCalendar: React.FC<EpCalendarProps> = ({ userLocale, nextEpsByDate }) => {
  const [currDate, setCurrDate] = useState(new Date());
  const shouldRenderTileContent = useMemo(() => Object.keys(nextEpsByDate).length > 0, [nextEpsByDate]);
  const tileContent = ({ date, view }: CalendarTileProperties)  => {
    if (!shouldRenderTileContent) {
      return null
    }

    let epEntries: React.ReactNode[] = [];
    let dayOfMonth = date.toLocaleDateString(userLocale);

    if(dayOfMonth in nextEpsByDate) {
      nextEpsByDate[dayOfMonth].forEach((ep, index) => {
        let airingTimeAndZone = new Date(ep.airing_at * 1000).toLocaleTimeString(userLocale, {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        });
        let title = ep.title_english ? ep.title_english : ep.title_romaji;
        epEntries.push(
          <div className='CalendarTileEntry' key={index}>
            <img src={ep.image_url} alt='eps' width='100%'/>
            {title}
            <br />
            Ep {ep.num}
            <p>{airingTimeAndZone}</p>
          </div>
        );
      })
    }

    return epEntries
  }
  
  return (
    <div>
      <Calendar
        onClickDay={() => {}} 
        value={currDate}
        locale={userLocale}
        tileContent={tileContent}       
      />
    </div>
  );
};

export default EpCalendar;
