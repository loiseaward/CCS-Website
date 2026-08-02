import  React, { useState, useEffect } from 'react';
import '../styles/index.css';
import { Header } from "../components/Header.jsx"
import { eventImages } from '../assets/event_card_pics';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

//one prop will just be the whole object from above so props.event.summary <EventCard event={}>
const EventCard = (props) => {
  const formatTime = (startObj) => {
    // Check if an all-day event (uses .date instead of .dateTime)
    if (startObj.date) {
      const date = new Date(startObj.date + 'T00:00:00');
      return date.toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
    //else case, normal event
    const date = new Date(startObj.dateTime);
    return date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  const formatDate = (startObj) => {
    const targetString = startObj.dateTime || startObj.date;
    const date = new Date(targetString);
    return date.toLocaleDateString(undefined, { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDateParts = (startObj) => {
    const targetString = startObj.dateTime || startObj.date;
    const date = new Date(targetString);

    return {
      month: date.toLocaleDateString(undefined, { month: 'short' }),
      day: date.toLocaleDateString(undefined, { day: 'numeric' }),
    };
  }

  const getImage = (eventID) => {
    // 1. Convert the ID string into a unique number (hash)
    let hash = 0;
    for (let i = 0; i < eventID.length; i++) {
        hash = eventID.charCodeAt(i) + ((hash << 5) - hash);
    }

    // 2. Use modulo (%) to fit the number to your array size
    const randomIndex = Math.abs(hash) % eventImages.length;
    return eventImages[randomIndex];
  }

  const eventImage = getImage(props.event.id);
  const eventDate = getDateParts(props.event.start);
  

  return (
    <div key={props.event.id} className="event-card">
      <div className="event-card-image-wrap">
        <img className="event-card-image" src={eventImage} alt="" />
        <div className="event-card-date-badge" aria-label={formatDate(props.event.start)}>
          <span>{eventDate.month}</span>
          <strong>{eventDate.day}</strong>
        </div>
      </div>
      <div className="event-card-content">
        <p className="event-card-kicker">CCS Event</p>
        <h2>{props.event.summary}</h2>
        <p className="event-card-description">{props.event.description}</p>
        <div className="event-card-details">
          <p><MapPin size={18} aria-hidden="true" />{props.event.location}</p>
          <p><CalendarDays size={18} aria-hidden="true" />{formatDate(props.event.start)}</p>
          <p><Clock size={18} aria-hidden="true" />{formatTime(props.event.start)} - {formatTime(props.event.end)}</p>
        </div>
      </div>
    </div>
  )
}

export const Calendar = () => {
  const [thisWeek, setThisWeek ] = useState([])
  const [nextWeek, setNextWeek ] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/calendar-events`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        const events = data.slice(0, 6); //only next 6 for readbility
        console.log(events);

        const now = new Date();
        const sevenDaysFromNow = new Date(now);
        sevenDaysFromNow.setDate(now.getDate() + 7);

        const getEventStartDate = (event) => {
          const startValue = event.start.dateTime || event.start.date;
          return new Date(startValue);
        };

        //filtering & sorting
        const eventsThisWeek = events.filter((event) => {
          const eventDate = getEventStartDate(event);
          return eventDate >= now && eventDate <= sevenDaysFromNow;
        });

        const futureEvents = events.filter((event) => {
          const eventDate = getEventStartDate(event);
          return eventDate > sevenDaysFromNow;
        });

        setThisWeek(eventsThisWeek);
        setNextWeek(futureEvents);
      })
      .catch((err) => {
        setError(err.message);
      });

  }, []);

  if (error) {return <p>Error: {error}; Under construction RN!!</p>;}

  return (
    <div>
        <Header title="Upcoming Events" subtitle="Mark your calenders and join us"/>
        <section className="bg-[#f2e8d5] h-auto px-6 py-10">
          <h2 className="p-4 text-center headers !text-3xl">Upcoming This Week</h2>
          <hr className="gradient-line" />
          {thisWeek.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        </section>
        <section className="bg-[#f2e8d5] h-auto px-6 py-10">
          <h2 className="p-4 text-center headers !text-3xl">Future Events...</h2>
          <hr className="gradient-line" />
          {nextWeek.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
          
        </section>
    </div>
  );
};
