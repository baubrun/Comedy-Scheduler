import React, { Component } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from "react-redux";
import Host from "./Host"


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


class CalendarView extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      events: [],
      title: "",
      start: null,
      end: null,
      location: "",
      performer: "",
      hostId: ""

    };
  }

  formattedEvents = () => {
    const filterEventProps = this.props.events.map(i => {
      return {
        title: i.title,
        start: new Date(i.start),
        end: new Date(i.end)
      };
    });
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

  /* try to pass location and title for Host component below */
  //   handleSelect = ({start, end}) => {
  //       this.setState({
  //     events: [...this.state.events, { start, end}]
  //   });
  // }


  /* fix this here */

  render() {
    return (
      <div>
        <Calendar
          endAccessor="end"
          // events={this.formattedEvents}
          events={this.state.events}
          selectable
          localizer={localizer}
          startAccessor="start"
          step={15}
          style={{ height: 500 }}
          views={allViews}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
          // onSelectSlot={this.renderHostForm}
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
