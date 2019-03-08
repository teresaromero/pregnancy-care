import React from "react";

import { InputP } from "./InputP";


export default class SearchBarPatients extends React.Component {
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

