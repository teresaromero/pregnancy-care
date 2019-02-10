import React from "react";
import cx from "classnames";

export class ModalCard extends React.Component {
  render() {
    let { children, title, isActive, handleClose } = this.props;
    let modalClass = cx("modal", { "is-active": isActive });
    return (
      <React.Fragment>
        <div className={modalClass}>
          <div className="modal-background" onClick={() => handleClose()} />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{title}</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => handleClose()}
              />
            </header>
            <section className="modal-card-body">{children}</section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
