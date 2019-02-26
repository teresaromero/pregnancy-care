import React from "react";
import { connect } from "react-redux";
import "fullcalendar-reactwrapper/dist/css/fullcalendar.min.css";
import FullCalendar from "fullcalendar-reactwrapper";
import { ModalCard } from "./ModalCard";
import { closeModal, selectDay, unSelectDay } from "../lib/redux/actions";
import NewAppointmentForm from "./NewAppointmentForm";
import { graphql, compose } from "react-apollo";
import {
  getAppointmentsQuery,
  updateDateTimeMutation
} from "../lib/graphQL/queries";

class Agenda extends React.Component {
  handleSelectDate(start, end) {
    let { dispatch } = this.props;
    let e = { start: start, end: end };
    dispatch(selectDay(e));
  }

  handleClick(e, jsEv, view) {
    let { dispatch } = this.props;
    dispatch(selectDay(e));
  }

  handleUpdate(e, delta, revertFunc) {
    let { start, end, _id } = e;
    let { updateDateTimeMutation } = this.props;
    updateDateTimeMutation({
      variables: {
        id: _id,
        start: start,
        end: end
      },
      refetchQueries: [{ query: getAppointmentsQuery }]
    });
  }

  handleDrop(event, delta, revertFunc) {
    let { start, end, _id } = event;
    let { updateDateTimeMutation } = this.props;
    updateDateTimeMutation({
      variables: {
        id: _id,
        start: start,
        end: end
      },
      refetchQueries: [{ query: getAppointmentsQuery }]
    });
  }

  render() {
    let { getAppointmentsQuery, modalAppointment, dispatch } = this.props;
    return (
      <React.Fragment>
        <div id="calendar" className="section">
          <FullCalendar
            schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
            defaultView={"agendaWeek"}
            handleWindowResize={true}
            visibleRange={{ start: Date.now }}
            nowIndicator={true}
            events={getAppointmentsQuery.appointments}
            gotoDate={Date.now()}
            loading={(isLoading, view) => this.handleLoading(isLoading, view)}
            firstDay="1"
            weekends={false}
            slotDuration={"00:15:00"}
            slotLabelFormat="HH:mm"
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
            eventOverlap={false}
          />
        </div>

        <ModalCard
          id="appointment-modal"
          isActive={modalAppointment}
          closeModal={() => {
            dispatch(closeModal());
            dispatch(unSelectDay());
          }}
        >
          <NewAppointmentForm />
        </ModalCard>
      </React.Fragment>
    );
  }
}

export default compose(
  graphql(getAppointmentsQuery, { name: "getAppointmentsQuery" }),
  graphql(updateDateTimeMutation, { name: "updateDateTimeMutation" })
)(connect(store => ({ modalAppointment: store.modalAppointment }))(Agenda));
