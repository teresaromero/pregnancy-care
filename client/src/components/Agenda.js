import React from "react";
import $ from "jquery";
import "fullcalendar";
import "fullcalendar/dist/fullcalendar.css"

export class Agenda extends React.Component {
  render() {
    return <div id="calendar" />;
  }
  componentDidMount() {
    $("#calendar").fullCalendar({
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      defaultView:'agendaWeek',
      weekends:false,
      columnHeaderFormat:"dddd D",
      slotLabelFormat: [
        'HH:mm', // top level of text
      ],
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        dow: [ 1, 2, 3, 4,5 ], // Monday - Thursday
      
        start: '10:00', // a start time (10am in this example)
        end: '18:00', // an end time (6pm in this example)
      },
      header: {
        left: "prev,next today",
        center: "title",
        right: "agendaWeek,agendaDay"
      },
      nowIndicator:true,
      allDaySlot:false,
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
  }
}
