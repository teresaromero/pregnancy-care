import React from "react";
import cx from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class _ModalCard extends React.Component {
  render() {
    let { children, id, isActive, closeModal } = this.props;
    let modalClass = cx("modal", { "is-active": isActive });
    return (
      <React.Fragment>
        <div id={id} className={modalClass}>
          <div className="modal-background" onClick={() => closeModal()} />
          <div className="modal-content">{children}</div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => closeModal()}
          />
        </div>
      </React.Fragment>
    );
  }
}

export const ModalCard = withRouter(
  connect()(_ModalCard)
);
