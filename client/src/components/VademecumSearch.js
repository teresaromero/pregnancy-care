import React from "react";

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
    console.log(this.state.query);
    if (e.target.value !== "") {
      let param = e.target.name;
      this.setState({ query: e.target.value }, () => {
        VademecumApi.drugs(param, this.state.query).then(results => {
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
          <InputF
            name="nombre"
            title="Search"
            label="Drug Name"
            inputtype="text"
            placeholder=""
            value={this.state.queryName}
            handleChange={e => this.handleSearch(e)}
          />

          <nav class="level is-mobile">
            <div class="level-item has-text-centered">
              <span class="icon is-large has-text-danger">
                <i class="fas fa-user-md" aria-hidden="true" />
              </span>
              <span>With medical reciept</span>
            </div>
            <div class="level-item has-text-centered">
              <span class="icon is-large has-text-danger">
                <i class="fas fa-car-crash" aria-hidden="true" />
              </span>
              <span>Driving effects</span>
            </div>
            <div class="level-item has-text-centered">
              <span class="icon is-large has-text-danger">
                <i class="fas fa-caret-down" aria-hidden="true" />
              </span>
              <span>Black triangle</span>
            </div>
          </nav>

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
                  <DrugListCard key={drug._id} drug={drug} />
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
        </div>
      </React.Fragment>
    );
  }
}
