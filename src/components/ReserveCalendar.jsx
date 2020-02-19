import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';




const localizer = momentLocalizer(moment);
const myEventList = [
    {
        'title': 'My event',
        'allDay': false,
        // 'start': new Date(), // 10.00 AM
        // 'end': new Date(2018, 0, 1, 14, 0), // 2.00 PM 
      }
];



const formats = {
  agendaTimeFormat : "HH:mm"
}



const ReserveCalendar = props => {
  return (
    <div>
      <Calendar
        endAccessor="end"
        events={myEventList}
        localizer={localizer}
        startAccessor="start"
        step={30}
        // min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
        min={new Date(2020, 1, 16, 21, 0)} // 8.00 AM
        // max={new Date(2008, 0, 1, 17, 0)} // Max will be 6.00 PM!
        max={new Date(2020, 1, 22, 1, 0)} // Max will be 6.00 PM!
        style={{ height: 500 }}
        // date={new Date(2018, 0, 1)}
        view='week'
        views={['week']}
        formats={formats}
      />
    </div>
  );
};

export default ReserveCalendar;
