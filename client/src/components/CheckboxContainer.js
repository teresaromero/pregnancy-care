import React from "react";

import { Checkbox } from "./Checkbox";

class CheckboxContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedItems: new Map()
    };
  }

  handleChange(e) {
    let { selection } = this.props;
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(
      prevState => ({
        checkedItems: prevState.checkedItems.set(item, isChecked)
      }),
      () => selection(this.state.checkedItems)
    );
  }

  render() {
    let { options } = this.props;
    return (
      <React.Fragment>
        <div className="columns is-multiline">
          {options.map(item => (
            <div key={item} className="column">
              <label>
                <Checkbox
                  name={item}
                  checked={this.state.checkedItems.get(item)}
                  onChange={e => this.handleChange(e)}
                />
                <span> {item}</span>
              </label>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default CheckboxContainer;
