import React from 'react';
import '../styles/index.css';
import { Header } from "../components/Header.jsx"

const tempEvents = [{
    kind: "calendar#event",
    id: "e1_this_week_2026",
    summary: "Project Status Sync",
    description: "Weekly alignment meeting to review ongoing development sprints.",
    location: "Conference Room B / Zoom",
    start: {
      dateTime: "2026-07-16T10:00:00-05:00",
      timeZone: "America/Indiana/Indianapolis"
    },
    end: {
      dateTime: "2026-07-16T11:00:00-05:00",
      timeZone: "America/Indiana/Indianapolis"
    }
  },
  {
    kind: "calendar#event",
    id: "e2_future_week_3_a",
    summary: "Quarterly Business Review",
    description: "Executive presentation on performance metrics and upcoming goals.",
    location: "Main HQ Ballroom",
    start: {
      dateTime: "2026-08-04T13:00:00-05:00",
      timeZone: "America/Indiana/Indianapolis"
    },
    end: {
      dateTime: "2026-08-04T15:30:00-05:00",
      timeZone: "America/Indiana/Indianapolis"
    }
  },
  {
    kind: "calendar#event",
    id: "e3_future_week_3_b",
    summary: "Product Launch Strategy",
    description: "Brainstorming session for marketing assets and rollout schedule.",
    location: "Design Studio / Google Meet",
    start: {
      dateTime: "2026-08-06T09:30:00-05:00",
      timeZone: "America/Indiana/Indianapolis"
    },
    end: {
      dateTime: "2026-08-06T11:00:00-05:00",
      timeZone: "America/Indiana/Indianapolis"
    }
  }
];

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

  return (
    <div key={props.event.id} className="">
      <h2>{props.event.summary}</h2>
      <h3>{props.event.description}</h3>
      <p>Location: {props.event.location}</p>
      <p>Date: {formatDate(props.event.start)}</p>
      <p>Time: {formatTime(props.event.start)} - {formatTime(props.event.end)}</p>
    </div>
  )
}

export const Calendar = () => {
  return (
    <div>
        <Header title="Upcoming Events" subtitle="Mark your calenders and join us"/>
        <section className="bg-[#f2e8d5] h-auto px-6 py-10">
          <h2 className="p-4 text-center headers !text-2xl">Upcoming This Week</h2>
          <hr className="gradient-line" />
          <EventCard event={tempEvents[0]}/>
        </section>
        <section className="bg-[#f2e8d5] h-auto px-6 py-10">
          <h2 className="p-4 text-center headers !text-2xl">Future Events</h2>
          <hr className="gradient-line" />
          
        </section>
    </div>
  );
};
