import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { closeModal } from "../lib/redux/actions";

import { InputP } from "./InputP";

import { Loader } from "./Loader";
import AutosuggestSelector from "./AutosuggestSelector";
import { graphql, compose } from "react-apollo";
import {
  addAppointmentMutation,
  getAppointmentsQuery,
  updateAppointmentMutation,
  deleteAppointmentMutation
} from "../lib/graphQL/queries";

class NewAppointmentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      appointment: {
        description: ""
      }
    };
  }

  componentWillMount() {
    this.setState({ appointment: this.props.selectedDay });
  }

  componentWillReceiveProps(nextProps) {
    let { selectedDay } = nextProps;
    this.setState({ appointment: selectedDay });
  }

  handleSave(e) {
    let { dispatch, addAppointmentMutation } = this.props;
    e.preventDefault();
    let { start, end, title, description, userId } = this.state.appointment;
    addAppointmentMutation({
      variables: {
        title: title,
        start: start,
        end: end,
        description: description,
        userId: userId
      },
      refetchQueries: [{ query: getAppointmentsQuery }]
    });
    dispatch(closeModal());
  }

  handleUpdate(e) {
    let { dispatch, updateAppointmentMutation } = this.props;
    e.preventDefault();
    let {
      _id,
      start,
      end,
      title,
      description,
      userId
    } = this.state.appointment;
    updateAppointmentMutation({
      variables: {
        id: _id,
        title: title,
        start: start,
        end: end,
        description: description,
        userId: userId
      },
      refetchQueries: [{ query: getAppointmentsQuery }]
    });
    dispatch(closeModal());
  }

  handleDelete(e) {
    e.preventDefault();
    let { appointment } = this.state;
    let { dispatch, deleteAppointmentMutation } = this.props;
    deleteAppointmentMutation({
      variables: {
        id: appointment._id
      },
      refetchQueries: [{ query: getAppointmentsQuery }]
    });
    dispatch(closeModal());
  }

  handleDateChange(e) {
    let upt = { ...this.state.appointment };
    let { value, name } = e.target;
    upt[name] = moment(moment(value).toISOString());
    this.setState({ appointment: upt });
  }

  handleChange(e) {
    let upt = { ...this.state.appointment };
    let { value, name } = e.target;
    upt[name] = value;
    this.setState({ appointment: upt });
  }

  patientSelection(p) {
    let upt = { ...this.state.appointment };
    upt.userId = p._id;
    upt.title = `${p.name} ${p.surname}`;
    this.setState({ appointment: upt });
  }

  render() {
    let { appointment } = this.state;
    let { selectedDay, dispatch } = this.props;
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
                handleChange={e => this.handleChange(e)}
              />
              {selectedDay._id ? (
                <div className="buttons">
                  <button
                    className="button is-primary"
                    onClick={e => this.handleUpdate(e)}
                  >
                    Update
                  </button>

                  <button
                    className="button is-danger"
                    onClick={e => this.handleDelete(e)}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div className="buttons">
                  <button
                    className="button is-primary"
                    onClick={e => this.handleSave(e)}
                  >
                    Save
                  </button>

                  <button
                    className="button is-danger"
                    onClick={() => dispatch(closeModal())}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default compose(
  graphql(addAppointmentMutation, { name: "addAppointmentMutation" }),
  graphql(deleteAppointmentMutation, { name: "deleteAppointmentMutation" }),
  graphql(updateAppointmentMutation, { name: "updateAppointmentMutation" })
)(connect(store => ({ selectedDay: store.selectedDay }))(NewAppointmentForm));
