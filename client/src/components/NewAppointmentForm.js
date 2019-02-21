import React from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { closeModal } from "../lib/redux/actions";

import PatientsApi from "../lib/APIs/patientsApi";
import { InputP } from "./InputP";

import { TextArea } from "./TextArea";

import { Loader } from "./Loader";

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

  handleSave(e) {
    e.preventDefault();
    console.log(this.state.appointment);
  }

  handleRecordChange(e) {
    let uptRecord = { ...this.state.record };
    let { value } = e.target;
    let field = e.target.name;
    uptRecord[field] = value;
    this.setState({ record: uptRecord });
  }

  handleSelection(s, field) {
    let uptRecord = { ...this.state.record };
    let selected = [];
    s.forEach((v, k) => {
      if (v) {
        selected.push(k);
      }
    });
    uptRecord[field] = selected;
    this.setState({ record: uptRecord });
  }

  render() {
    let { appointment } = this.state;
    let { selectedDay } = this.props;
    return (
      <React.Fragment>
        {selectedDay ? (
          <React.Fragment>
            <div className="box">
            

              <p>{selectedDay._id}</p>

              <div className="section has-text-centered">
                <button
                  className="button is-primary"
                  onClick={e => this.handleSave(e)}
                >
                  Save
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
