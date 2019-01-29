import React from "react";
import { withRouter } from "react-router-dom";

class Modal extends React.Component {
  goBack() {
    this.props.history.goBack();
  }

  render() {
    let { children } = this.props;
    console.log(this.props.location);
    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={() => this.goBack()} />
        <div className="modal-content">
          <div className="box">{children}</div>
        </div>
        <button
          className="modal-close"
          aria-label="close"
          onClick={() => this.goBack()}
        />
      </div>
    );
  }
}

export default withRouter(Modal);
