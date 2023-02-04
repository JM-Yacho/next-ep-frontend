import React, {useState} from 'react';
import Calendar from 'react-calendar'

// import 'react-calendar/dist/Calendar.css';

const EpCalendar = ({animes}) => {
  const [value, onChange] = useState(new Date());

  let nextEps = {};
  animes.forEach((anime, i) => {
    let airingDate = (new Date(anime.nextEp.airingAt * 1000)).toISOString().split('T')[0];
    if(airingDate in nextEps) {
      nextEps[airingDate].push(anime);
    }
    else {
      nextEps[airingDate] = [anime];
    }
  });

  return (
    <div>
      <Calendar onChange={onChange} value={value} view='month' tileContent={({date, view}) => {
        let animeEntries = [];
        let currDate = date.toISOString().split('T')[0];

        if(currDate in nextEps) {
          nextEps[currDate].forEach((anime, index) => {
            animeEntries.push(
              <div className='CalendarTileEntry' key={index}>
                <img src={anime.pictureUrl} alt='animes' width='100%'/>
                <p>{anime.title} | Ep {anime.nextEp.episode}</p>
                <p>{(new Date(anime.nextEp.airingAt * 1000)).toTimeString()}</p>
              </div>
            );
          });
        }
        
        if(animeEntries) {
          return (
            <div className='CalendarTile'>
              <div>{animeEntries}</div>
            </div>
          );
        }
        return null;
      }} />
    </div>
  )
}

export default EpCalendar;
