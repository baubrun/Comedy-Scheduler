import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from "react-redux";
import { _ } from "underscore";

const allViews = Object.keys(Views).map(k => Views[k]);
const localizer = momentLocalizer(moment);



const eventStyleGetter = (event, start, end, isSelected) => {
  const style = {
    backgroundColor: "#663A2B",
    // opacity: 0.8,
    color: "white",
    className: "event1"
  };
  return {
    style: style
  };
};

const ReserveCalendar = props => {
  console.log('props.events :', props.events);
  const ans2 = props.events.map(i => {
    return {
      title: i.title,
      start: new Date(i.start),
      end: new Date(i.end)
    };
  });
   console.log('ans2 :', ans2);

  return (
    <div>
      <Calendar
        endAccessor="end"
        events={ans2}
        localizer={localizer}
        startAccessor="start"
        step={30}
        style={{ height: 500 }}
        views={allViews}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    events: state.events
  };
};

export default connect(mapStateToProps)(ReserveCalendar);
