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

  componentDidMount() {
    let { dispatch } = this.props;
    console.log("Component did mount");

    PatientsApi.allPatients().then(data => {
      dispatch(fetchPatients(data.patients));
    });
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  handleSearch(e) {
    let { dispatch } = this.props;
    if (e.target.value !== "") {
      this.setState({ query: e.target.value }, () => {
        PatientsApi.search(this.state.query).then(res => {
          let { patients } = res;
          dispatch(filterPatients(patients));
        });
      });
    } else {
      this.setState({ query: e.target.value }, () => {
        PatientsApi.allPatients().then(data => {
          dispatch(filterPatients(data.patients));
        });
      });
    }
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
