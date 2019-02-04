import React from "react";

import PatientsApi from "../lib/patientsApi.js";
import { PatientsListCard } from "./PatientsListCard.js";
import { InputF } from "./Input.js";
import VademecumApi from "../lib/vademecumApi.js";
import { DrugListCard } from "./DrugListCard.js";

export default class VademecumSearch extends React.Component {
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
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  handleSearch(e) {
    if (e.target.value !== "") {
      let param = e.target.name;
      this.setState({ query: e.target.value }, () => {
        VademecumApi.drugs(param, this.state.query).then(results => {
          console.log(results);
          this.setState({ data: results });
        });
      });
    } else {
      this.setState({ query: "" });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="section">
          <div className="container">
            <InputF
              name="nombre"
              title="Search"
              label="Drug Name"
              inputtype="text"
              placeholder=""
              value={this.state.queryName}
              handleChange={e => this.handleSearch(e)}
            />
            <div className="columns is-multiline">
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
                  this.state.data.map(drug => (
                    <DrugListCard key={drug._id} drug={drug} />
                  ))
                )
              ) : (
                <progress className="progress is-small is-primary" max="100">
                  15%
                </progress>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
