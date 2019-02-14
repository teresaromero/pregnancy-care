import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const _Timeline = () => {
  return (
    <div className="timeline">
      <div className="timeline-item">
        <div className="timeline-marker" />
        <div className="timeline-content">
          <p className="heading">March 2017</p>
          <p className="heading">Week 10</p>
          <div className="box">
            <div className="field-wrapper section">
              <p className="label">Weight:</p>
              <p className="label">Blood Pressure:</p>

              <p className="label">Requested Test:</p>
              <p className="label">Test Results:</p>

              <p className="label">Notes:</p>

              <p className="label">Recomendations:</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Timeline = withRouter(
  connect(store => ({ patient: store.patient }))(_Timeline)
);
