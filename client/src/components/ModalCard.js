import React from "react";
import cx from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class _ModalCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: false
    };
  }

  openModal() {
    this.setState({
      isActive: true
    });
  }

  closeModal() {
    this.setState({
      isActive: false
    });
  }

  render() {
    let { children, title, button } = this.props;
    let { isActive } = this.state;
    let modalClass = cx("modal", { "is-active": isActive });
    return (
      <React.Fragment>
        <button className="button is-primary is-outlined" onClick={() => this.openModal()}>
          {button}
        </button>

        <div className={modalClass}>
          <div className="modal-background" onClick={() => this.closeModal()} />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{title}</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => this.closeModal()}
              />
            </header>
            <section className="modal-card-body">{children}</section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export const ModalCard = withRouter(
  connect(store => ({ modal: store.modal }))(_ModalCard)
);
