import React from "react";
import $ from "jquery";
import "fullcalendar";
import "fullcalendar/dist/fullcalendar.css";
import { calendarFormat } from "moment";
import AppointmentsAPI from "../lib/APIs/appointmentsAPI";

export class Agenda extends React.Component {
  constructor() {
    super();
    this.state = {
      appointments: null
    };
  }

  componentDidMount() {
    AppointmentsAPI.allAppointments().then(res => {
      let { appointments } = res;
      this.setState({ appointments }, () => {
        $("#calendar").fullCalendar({
          schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
          defaultView: "agendaWeek",
          events: this.state.appointments,
          weekends: false,
          columnHeaderFormat: "dddd D",
          slotLabelFormat: [
            "HH:mm" // top level of text
          ],
          businessHours: {
            // days of week. an array of zero-based day of week integers (0=Sunday)
            dow: [1, 2, 3, 4, 5], // Monday - Thursday

            start: "10:00", // a start time (10am in this example)
            end: "18:00" // an end time (6pm in this example)
          },
          header: {
            left: "prev,next today",
            center: "title",
            right: "agendaWeek,agendaDay"
          },
          nowIndicator: true,
          allDaySlot: false,
          selectable: true,
          selectHelper: true,

          select: (start, end) => {
            let title = prompt("Name and Surname");
            let appointment = {
              title: title,
              start: start,
              end: end
            };
            console.log(appointment);
            $("#calendar").fullCalendar("renderEvent", appointment, true);

            AppointmentsAPI.addAppointment(appointment).then(res =>
              $("#calendar").fullCalendar("unselect")
            );
          },
          editable: true,
          droppable: true, // this allows things to be dropped onto the calendar
          drop: function() {
            // is the "remove after drop" checkbox checked?
            if ($("#drop-remove").is(":checked")) {
              // if so, remove the element from the "Draggable Events" list
              $(this).remove();
            }
          }
        });
      });
    });
  }

  render() {
    return <div id="calendar" />;
  }
}
