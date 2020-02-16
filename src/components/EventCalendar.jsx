import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';




const localizer = momentLocalizer(moment);
const myEventList = [
    {
        'title': 'My event',
        'allDay': false,
        'start': new Date(2018, 0, 1, 10, 0), // 10.00 AM
        // 'end': new Date(2018, 0, 1, 14, 0), // 2.00 PM 
      }
];

const EventCalendar = props => {


  return (
    <div>
      <Calendar
        endAccessor="end"
        events={myEventList}
        localizer={localizer}
        startAccessor="start"
        step={60}
        // min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
        // max={new Date(2008, 0, 1, 17, 0)} // Max will be 6.00 PM!
        style={{ height: 500 }}
        // date={new Date(2018, 0, 1)}
        view='month'
        views={['month']}
  
      />
    </div>
  );
};

export default EventCalendar;
