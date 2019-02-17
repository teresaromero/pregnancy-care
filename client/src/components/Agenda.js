import React from "react";
import $ from "jquery";
import "fullcalendar";
import "fullcalendar/dist/fullcalendar.css";
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
          firstDay: 1,
          weekends:false,
          columnHeaderFormat: "dddd D",
          slotLabelFormat: [
            "HH:mm" // top level of text
          ],
          slotDuration:'00:15:00',
          timezone: "local",
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
            $("#calendar").fullCalendar("renderEvent", appointment, true);

            AppointmentsAPI.addAppointment(appointment).then(res =>
              $("#calendar").fullCalendar("unselect")
            );
          },
          editable: true,
          eventClick: (e, jsEv, view) => {
            if(window.confirm("Delete appointment?")){
              $("#calendar").fullCalendar("removeEvents", e._id);
              AppointmentsAPI.delete(e._id).then(res=>{
                console.log("deleted")
              })
            } else {
              $("#calendar").fullCalendar("unselect")
            }
            
          },
          eventResize: (event, delta, revertFunc) => {
            let { start, end } = event;
            console.log(event.end, start, end);
            AppointmentsAPI.update(event._id, start, end).then(res =>
              $("#calendar").fullCalendar("unselect")
            );
          },
          eventDrop: (event, delta, revertFunc) => {
            let { start, end } = event;
            console.log(event.end, start, end);
            AppointmentsAPI.update(event._id, start, end).then(res =>
              $("#calendar").fullCalendar("unselect")
            );
          },

          droppable: true, // this allows things to be dropped onto the calendar
          drop: () => {
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
