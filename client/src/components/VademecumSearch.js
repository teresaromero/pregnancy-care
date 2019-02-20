import React from "react";

import { InputDiv } from "./InputDiv.js";
import VademecumApi from "../lib/APIs/vademecumApi.js";
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
      this.setState({ query: e.target.value }, () => {
        VademecumApi.drugs("nombre", this.state.query).then(results => {
          console.log(results);
          this.setState({ data: results });
        });
      });
    } else {
      this.setState({ query: "", data: null });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="section">
          <InputDiv
            name="nombre"
            title="Search"
            label="Drug Name"
            inputtype="text"
            placeholder=""
            value={this.state.query}
            handleChange={e => this.handleSearch(e)}
          />

          <div className="columns">
            <div className="column">
              <span className="icon is-large has-text-danger">
                <i className="fas fa-user-md" aria-hidden="true" />
              </span>
              <span>With medical reciept</span>
            </div>
            <div className="column">
              <span className="icon is-large has-text-danger">
                <i className="fas fa-car-crash" aria-hidden="true" />
              </span>
              <span>Driving effects</span>
            </div>
            <div className="column">
              <span className="icon is-large has-text-danger">
                <i className="fas fa-caret-down" aria-hidden="true" />
              </span>
              <span>Black triangle</span>
            </div>
          </div>

          

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
                this.state.data.map(drug => (
                  <DrugListCard key={drug.nregistro} drug={drug} />
                ))
              )
            ) : (
              <div className="section">
                <article className="message">
                  <div className="message-header">
                    <p>No data</p>
                  </div>
                  <div className="message-body">
                    Search for drugs by name and get information.
                  </div>
                </article>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
