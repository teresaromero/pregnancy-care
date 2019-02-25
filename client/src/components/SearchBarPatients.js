import React from "react";

import PatientsApi from "../lib/APIs/patientsApi.js";
import { InputP } from "./InputP";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchPatients, filterPatients } from "../lib/redux/actions.js";

class _SearchBarPatients extends React.Component {
  constructor() {
    super();
    this.state = {
      query: ""
    };
  }

  handleSearch(e) {
    this.setState({ query: e.target.value }, () => {
      this.props.onChange(this.state.query);
    });
  }

  render() {
    return (
      <div className="box">
        <InputP
          name="Search"
          title="Search"
          label="Patient Search"
          inputtype="text"
          help="Search by name, surname, id, phone, email..."
          value={this.state.query}
          handleChange={e => this.handleSearch(e)}
        />
      </div>
    );
  }
}

export const SearchBarPatients = withRouter(connect()(_SearchBarPatients));
