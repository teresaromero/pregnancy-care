import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "fullcalendar-reactwrapper/dist/css/fullcalendar.min.css";
import FullCalendar from "fullcalendar-reactwrapper";
import AppointmentsAPI from "../lib/APIs/appointmentsAPI";
import { ModalCard } from "./ModalCard";
import { getAppointments, closeModal, selectDay, unSelectDay } from "../lib/redux/actions";
import { NewAppointmentForm } from "./NewAppointmentForm";

class _Agenda extends React.Component {
  handleSelectDate(start, end) {
    let { dispatch } = this.props;
    let appointment = { start: start, end: end };

    AppointmentsAPI.addAppointment(appointment).then(res => {
      let { appointments } = res;
      dispatch(getAppointments(appointments));
    });
  }

  handleClick(e, jsEv, view) {
    let { dispatch } = this.props;
    dispatch(selectDay(e));

    // AppointmentsAPI.delete(e._id).then(res => {
    //   let { appointments } = res;
    //   this.setState({ appointments });
    // });
  }

  handleUpdate(e, delta, revertFunc) {
    let { dispatch } = this.props;
    let { start, end } = e;

    AppointmentsAPI.update(e._id, start, end).then(res => {
      let { appointments } = res;
      dispatch(getAppointments(appointments));
    });
  }

  handleDrop(event, delta, revertFunc) {
    let { dispatch } = this.props;
    let { start, end } = event;
    AppointmentsAPI.update(event._id, start, end).then(res => {
      let { appointments } = res;
      dispatch(getAppointments(appointments));
    });
  }

  componentDidMount() {
    let { dispatch } = this.props;
    AppointmentsAPI.allAppointments().then(res => {
      let { appointments } = res;
      dispatch(getAppointments(appointments));
    });
  }

  render() {
    let { appointments, modalAppointment, dispatch, selectedDay } = this.props;
    return (
      <React.Fragment>
        <div id="calendar">
          <FullCalendar
            schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
            defaultView={"agendaWeek"}
            handleWindowResize={true}
            visibleRange={{ start: Date.now }}
            nowIndicator={true}
            events={appointments}
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

        <ModalCard
          id="appointment-modal"
          isActive={modalAppointment}
          closeModal={() => {dispatch(closeModal());dispatch(unSelectDay())}}
        >
         <NewAppointmentForm/>
        </ModalCard>
      </React.Fragment>
    );
  }
}

export const Agenda = withRouter(
  connect(store => ({
    modalAppointment: store.modalAppointment,
    appointments: store.appointments,
    selectedDay: store.selectedDay
  }))(_Agenda)
);
