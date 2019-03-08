import React from "react";

import { InputP } from "./InputP";
import VademecumApi from "../lib/APIs/vademecumApi.js";
import { DrugListCard } from "./DrugListCard.js";

export default class VademecumSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      query: "",
      notFound: false,
      isLoading: false
    };
  }

  handleSearch() {
    this.setState({ isLoading: true }, () => {
      VademecumApi.drugs("nombre", this.state.query).then(results => {
        this.setState({ data: results, isLoading: false });
      });
    });
  }

  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <div className="columns is-mobile is-multiline">
          <div className="column is-full">
            <InputP
              name="nombre"
              title="Search"
              label="Drug Name"
              inputtype="text"
              placeholder=""
              value={this.state.query}
              handleChange={e => this.handleChange(e)}
            />
            <button
              className="button is-primary is-rounded"
              onClick={() => this.handleSearch()}
            >
              Search
            </button>
          </div>
          <div className="column is-full">
            <div className="columns is-mobile is-multiline is-paddingless is-marginless">
              <div className="column is-half-mobile is-paddingless is-marginless">
                <p className="is-paddingless is-marginless">
                  <span className="icon has-text-danger">
                    <i className="fas fa-user-md" aria-hidden="true" />
                  </span>
                  <span className="is-size-7">With medical reciept</span>
                </p>
              </div>
              <div className="column is-half-mobile is-paddingless is-marginless">
                <p className="is-paddingless is-marginless">
                  <span className="icon has-text-danger ">
                    <i className="fas fa-car-crash" aria-hidden="true" />
                  </span>
                  <span className="is-size-7">Driving effects</span>
                </p>
              </div>
              <div className="column is-half-mobile is-paddingless is-marginless">
                <p className="is-paddingless is-marginless">
                  <span className="icon has-text-success ">
                    <i className="fas fa-shopping-cart" aria-hidden="true" />
                  </span>
                  <span className="is-size-7">Marketed</span>
                </p>
              </div>
              <div className="column is-half-mobile is-paddingless is-marginless">
                <p className="is-paddingless is-marginless">
                  <span className="icon has-text-danger ">
                    <i className="fas fa-shopping-cart" aria-hidden="true" />
                  </span>
                  <span className="is-size-7">Not Marketed</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section is-paddingless">
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
            ) : this.state.isLoading ? (
              <progress className="progress is-small is-primary" max="100">
                15%
              </progress>
            ) : (
              <React.Fragment>
                <p>Total results: {this.state.data.length}</p>
                <div className="section">
                  {this.state.data.map(drug => (
                    <DrugListCard key={drug.nregistro} drug={drug} />
                  ))}
                </div>
              </React.Fragment>
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
      </React.Fragment>
    );
  }
}
