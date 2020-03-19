import React, { Component } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from "react-redux";
import "moment/locale/en-gb";


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
  eventTimeRangeStartFormat: ({ start }, culture, localizer) =>
    localizer.format(start, { date: "short" }, culture),
  eventTimeRangeEndFormat: ({ end }, culture, localizer) =>
    localizer.format(end, { date: "short" }, culture)
};

const DateTimeFormatter = (date, time) => {
  return moment(`${date} ${time}`).format();
};
class CalendarView extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      culture: "en-gb",
      events: [],
      title: "",
      start: null,
      end: null,
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      venue: "",
      performer: "",
      image: "",
      price: ""
    };
  }

  componentDidMount() {
    this.setState({ events: this.formattedEventsFromDB() });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.events !== this.props.events) {
      this.setState({
        events: this.formattedEventsFromDB(),
        venue:
          this.props.events[0] === undefined
            ? this.props.selectedVenue
            : this.props.events[0].venue
      });
    }
  }
  
  eventsByVenueHostId = () => {
    const filter = {
      hostId: this.props.hostId,
      venue: this.state.venue
    };
    const userEvents = this.props.userEvents.filter(item => {
      for (const key in filter) {
        if (item[key] !== filter[key] || !item[key]) return false;
      }
      return true;
    });
    this.setState({ events: userEvents });
  };

  formattedEventsFromDB = () => {
    const filterEventProps = this.props.events.map(event => {
      return {
        // works for non overnight events
        title: event.title,
        start: new Date(DateTimeFormatter(event.startDate, event.startTime)),
        end: new Date(DateTimeFormatter(event.endDate, event.endTime))
      };
    });
    return filterEventProps;
  };

  formatAddedEvents = (startStr, endStr, title) => {
    const [monthSt, dateSt, yearSt, timeSt] = startStr
      .toString()
      .split(" ")
      .slice(1, 5);
    const [monthEnd, dateEnd, yearEnd, timeEnd] = endStr
      .toString()
      .split(" ")
      .slice(1, 5);
    const regexTime = time =>
      time
        .split(/[d+:]/)
        .slice(0, 2)
        .join(":");
    const formatMonth = month =>
      moment()
        .month(month)
        .format("MM");
    this.setState({
      startDate: `${yearSt}-${formatMonth(monthSt)}-${dateSt}`,
      startTime: regexTime(timeSt),
      endDate: `${yearEnd}-${formatMonth(monthEnd)}-${dateEnd}`,
      endTime: regexTime(timeEnd),
      title: title
    });
  };

  storeCalendarEvent = async () => {
    const data = new FormData();
    data.append("title", this.state.title);
    data.append("startDate", this.state.startDate);
    data.append("startTime", this.state.startTime);
    data.append("endDate", this.state.endDate);
    data.append("endTime", this.state.endTime);
    data.append("hostId", this.props.hostId);
    data.append("venue", this.state.venue);
    await fetch("/profile", { method: "POST", body: data });
  };


  handleSelect = ({ start, end }) => {
    if (this.state.venue === ""){
      return
    }
    const title = window.prompt("New event title?");
    if (title) {
      this.setState({
        events: [...this.state.events, { start, end, title }]
      });
      //   console.log('start :', typeof(start.toString()));
      //   console.log('end :', typeof(end.toString()))
      this.formatAddedEvents(start, end, title);
      this.storeCalendarEvent();
    }
  };

  render() {
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
          // onSelectSlot={this.props.loggedIn ? this.handleSelect : ""}
          onSelectSlot={this.handleSelect}
          culture={this.state.culture}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    hostId: state.auth.hostId
  };
};

export default connect(mapStateToProps)(CalendarView);
