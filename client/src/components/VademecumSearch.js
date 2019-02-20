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
        <div className="columns is-mobile">
          <div className="column">
            <InputDiv
              name="nombre"
              title="Search"
              label="Drug Name"
              inputtype="text"
              placeholder=""
              value={this.state.query}
              handleChange={e => this.handleSearch(e)}
            />
          </div>
          <div className="column is-one-third">
            <p className="is-paddingless is-marginless">
              <span className="icon has-text-danger">
                <i className="fas fa-user-md" aria-hidden="true" />
              </span>
              <span className="is-size-7">With medical reciept</span>
            </p>

            <p className="is-paddingless is-marginless">
              <span className="icon has-text-danger ">
                <i className="fas fa-car-crash" aria-hidden="true" />
              </span>
              <span className="is-size-7">Driving effects</span>
            </p>
            <p className="is-paddingless is-marginless">
              <span className="icon has-text-success ">
                <i className="fas fa-shopping-cart" aria-hidden="true" />
              </span>
              <span className="is-size-7">Marketed</span>
            </p>
            <p className="is-paddingless is-marginless">
              <span className="icon has-text-danger ">
                <i className="fas fa-shopping-cart" aria-hidden="true" />
              </span>
              <span className="is-size-7">Not Marketed</span>
            </p>


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
            ) : (
              <React.Fragment>
                <p>Total results: {this.state.data.length}</p>
                <div className="section is-paddingless is-marginless">
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
