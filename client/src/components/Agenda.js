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
