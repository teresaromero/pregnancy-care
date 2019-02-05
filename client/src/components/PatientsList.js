import React from "react";

import PatientsApi from "../lib/patientsApi.js";
import { PatientsListCard } from "./PatientsListCard.js";
import { InputDiv } from "./InputDiv.js";

export default class PatientsList extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      query: "",
      notFound: false
    };
  }
  componentDidMount() {
    console.log("Component did mount");

    PatientsApi.allPatients().then(data => {
      console.log(data.users);
      this.setState({ data: data.users });
    });
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  handleSearch(e) {
    if (e.target.value !== "") {
      this.setState({ query: e.target.value }, () => {
        PatientsApi.search(this.state.query).then(results => {
          this.setState({ data: results });
        });
      });
    } else {
      this.setState({ query: e.target.value, notFound: false }, () => {
        PatientsApi.allPatients().then(data => {
          this.setState({ data: data.users });
        });
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <InputDiv
          name="Search"
          title="Search"
          label="Quick Search"
          inputtype="text"
          placeholder="Search by name, surname, id, phone (Only exact values)"
          value={this.state.query}
          handleChange={e => this.handleSearch(e)}
        />
        <div className="section">
          {this.state.data ? (
            this.state.data.length === 0 ? (
              <div className="section">
                <article className="message is-danger">
                  <div className="message-header">
                    <p>Not Found</p>
                  </div>
                  <div className="message-body">Not matching</div>
                </article>
              </div>
            ) : (
              this.state.data.map(patient => (
                <PatientsListCard key={patient._id} patient={patient} />
              ))
            )
          ) : (
            <div className="section">
              <article class="message">
                <div class="message-header">
                  <p>No data</p>
                </div>
                <div class="message-body">
                  Search for drugs by name and get information.
                </div>
              </article>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
