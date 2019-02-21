import React from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { closeModal, getAppointments } from "../lib/redux/actions";

import PatientsApi from "../lib/APIs/patientsApi";
import { InputP } from "./InputP";

import { TextArea } from "./TextArea";

import { Loader } from "./Loader";
import AutosuggestSelector from "./AutosuggestSelector";
import AppointmentsAPI from "../lib/APIs/appointmentsAPI";

class _NewAppointmentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      appointment: null
    };
  }

  componentWillReceiveProps(nextProps) {
    let { selectedDay } = nextProps;
    this.setState({ appointment: selectedDay });
  }

  componentWillUnmount() {
    this.setState({ appointment: null });
  }

  handleSave(e) {
    let { dispatch } = this.props;
    e.preventDefault();
    let {
      _id,
      start,
      end,
      title,
      description,
      userId
    } = this.state.appointment;
    let uptApp = { _id, start, end, title, description, userId };
    AppointmentsAPI.update(uptApp)
      .then(res => {
        let { appointments } = res;
        dispatch(getAppointments(appointments));
        dispatch(closeModal());
      })
      .catch(e => console.log(e));
  }

  handleDelete(e) {
    e.preventDefault();
    let { appointment } = this.state;
    let { dispatch } = this.props;
    AppointmentsAPI.delete(appointment._id).then(res => {
      let { appointments } = res;
      dispatch(getAppointments(appointments));
      dispatch(closeModal());
    });
  }

  handleDateChange(e) {
    let upt = { ...this.state.appointment };
    let { value, name } = e.target;
    console.log(e.target);
    upt[name] = moment(moment(value).toISOString());
    this.setState({ appointment: upt }, () =>
      console.log(this.state.appointment)
    );
  }

  handleChange(e) {
    let upt = { ...this.state.appointment };
    let { value, name } = e.target;
    upt[name] = value;
    this.setState({ appointment: upt }, () =>
      console.log(this.state.appointment)
    );
  }

  patientSelection(p) {
    let upt = { ...this.state.appointment };
    upt.userId = p._id;
    upt.title = `${p.name} ${p.surname}`;
    this.setState({ appointment: upt });
  }

  render() {
    let { appointment } = this.state;
    let { selectedDay } = this.props;
    return (
      <React.Fragment>
        {selectedDay ? (
          <React.Fragment>
            <div className="box">
              <div className="columns is-paddingless is-marginless">
                <div className="column">
                  <InputP
                    id="start"
                    name="start"
                    label="Start"
                    value={moment(appointment.start).format(
                      "YYYY-MM-DDTHH:mm:ss"
                    )}
                    type="datetime-local"
                    placeholder=""
                    handleChange={e => this.handleDateChange(e)}
                  />
                </div>
                <div className="column">
                  <InputP
                    id="end"
                    name="end"
                    label="End"
                    value={moment(appointment.end).format(
                      "YYYY-MM-DDTHH:mm:ss"
                    )}
                    type="datetime-local"
                    placeholder=""
                    handleChange={e => this.handleDateChange(e)}
                  />
                </div>
              </div>
              <div className="columns is-marginless is-paddingless">
                <div className="column">
                  <p>Select patient for this appointment:</p>
                  <AutosuggestSelector
                    onChange={p => this.patientSelection(p)}
                  />
                </div>
                <div className="column">
                  <p>Patient: {appointment.title}</p>
                </div>
              </div>

              <InputP
                id="description"
                name="description"
                label="Description"
                value={appointment.description}
                type="text"
                placeholder=""
                handleChange={e => this.handleChange(e)}
              />

              <div className="buttons">
                <button
                  className="button is-primary"
                  onClick={e => this.handleSave(e)}
                >
                  Save
                </button>

                <button
                  className="button is-danger"
                  onClick={e => this.handleDelete(e)}
                >
                  Delete
                </button>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export const NewAppointmentForm = withRouter(
  connect(store => ({ selectedDay: store.selectedDay }))(_NewAppointmentForm)
);
