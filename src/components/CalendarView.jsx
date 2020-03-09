import React, { Component } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from "react-redux";
import 'moment/locale/en-gb';

const allViews = Object.keys(Views).map(k => Views[k]);
const localizer = momentLocalizer(moment);

const eventStyleGetter = (event, start, end, isSelected) => {
  const style = {
    backgroundColor: "#663A2B",
    color: "white"
  };
  return {
    style: style
  };
};


const formats = {
  // eventTimeRangeStartFormat: "",
  // eventTimeRangeFormat: ""
  eventTimeRangeStartFormat: ({ start}, culture, localizer) => ( 
  localizer.format(start, { date: 'short' }, culture)
),
  eventTimeRangeEndFormat: ({ end}, culture, localizer) => (
  localizer.format(end, { date: 'short' }, culture)
  )

}



const DateTimeFormatter = (date, time) => {
  return moment(`${date} ${time}`).format()

}
class CalendarView extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      events: [],
      title: "",
      start: null,
      end: null,
      venue: "",
      performer: "",
      price: "",
      hostId: "",
      culture: "en-gb",
    };
  }

  formattedEvents = () => {
    console.log('this.props.events :', this.props.events);

    const filterEventProps = this.props.events.map(event => {
      console.log("DateTimeFormatter", DateTimeFormatter(event.startDate, event.startTime))
      console.log("DateTimeFormatter", DateTimeFormatter(event.endDate, event.endTime))
      return {
        // works for non overnight events
        title: event.title,
        start: new Date(DateTimeFormatter(event.startDate, event.startTime)),
        end: new Date(DateTimeFormatter(event.endDate, event.endTime)),
      };
    });
    console.log('filterEventProps :', filterEventProps);
    return filterEventProps
  };

  componentDidMount() {
    this.setState({events: this.formattedEvents()})
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt("new event name");
    if (title) {
      this.setState({
        events: [...this.state.events, { start, end, title }]
      });
    }
  };

  /* try to pass location and title for AddEvent component below */
  //   handleSelect = ({start, end}) => {
  //       this.setState({
  //     events: [...this.state.events, { start, end}]
  //   });
  // }



  render() {
    console.log('this.state.events :', this.state.events);

    return (
      <div>
        <Calendar
          endAccessor="end"
          formats={formats}
          events={this.state.events}
          selectable
          localizer={localizer}
          startAccessor="start"
          step={30}
          style={{ height: 500 }}
          views={allViews}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
          culture={this.state.culture}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events
  };
};

export default connect(mapStateToProps)(CalendarView);
