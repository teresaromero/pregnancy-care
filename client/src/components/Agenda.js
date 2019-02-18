import React from "react";
import "fullcalendar-reactwrapper/dist/css/fullcalendar.min.css";
import FullCalendar from "fullcalendar-reactwrapper";
import AppointmentsAPI from "../lib/APIs/appointmentsAPI";
import { InputP } from "./InputP";
import moment from "moment";

const visitOptions = ["Option1", "Option2"];

export class Agenda extends React.Component {
  constructor() {
    super();
    this.state = {
      appointments: null
    };
  }

  handleSelectDate(start, end) {
    let appointment = { start: start, end: end };

    AppointmentsAPI.addAppointment(appointment).then(res => {
      let { appointment } = res;
      let updEvents = [...this.state.appointments, appointment];
      this.setState({ appointments: updEvents });
    });
  }

  handleClick(e, jsEv, view) {
    AppointmentsAPI.delete(e._id).then(res => {
      let { appointments } = res;
      this.setState({ appointments });
    });
  }

  handleUpdate(e, delta, revertFunc) {
    let { start, end } = e;

    AppointmentsAPI.update(e._id, start, end).then(res => {
      let { appointments } = res;
      this.setState({ appointments });
    });
  }

  handleDrop(event, delta, revertFunc) {
    let { start, end } = event;
    AppointmentsAPI.update(event._id, start, end).then(res => {
      let { appointments } = res;
      this.setState({ appointments });
    });
  }

  componentDidMount() {
    AppointmentsAPI.allAppointments().then(res => {
      let { appointments } = res;
      this.setState({ appointments });
    });
  }

  componentDidUpdate() {}

  render() {
    return (
      <React.Fragment>
        <div id="calendar">
          <FullCalendar
            schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
            defaultView={"agendaWeek"}
            visibleRange={{ start: Date.now }}
            nowIndicator={true}
            events={this.state.appointments}
            firstDay="1"
            weekends={false}
            slotDuration={"00:15:00"}
            minTime={"12:00:00"}
            maxTime={"22:00:00"}
            timezone="local"
            header={{
              left: "prev,next today",
              center: "title",
              right: "month,agendaWeek,agendaDay"
            }}
            allDaySlot={false}
            selectable={true}
            select={(start, end) => this.handleSelectDate(start, end)}
            editable={true}
            eventClick={(e, jsEv, view) => this.handleClick(e, jsEv, view)}
            eventResize={(e, delta, revertFunc) =>
              this.handleUpdate(e, delta, revertFunc)
            }
            eventDrop={(e, delta, revertFunc) =>
              this.handleDrop(e, delta, revertFunc)
            }
            droppable={true}
          />
        </div>
      </React.Fragment>
    );
  }
}
