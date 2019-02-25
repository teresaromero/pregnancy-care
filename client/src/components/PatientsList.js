import React from "react";
import { PatientsListCard } from "./PatientsListCard.js";
import { Loader } from "./Loader";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const PatientsList = ({ data }) => {
  return (
    <React.Fragment>
      {data.loading ? (
        <Loader />
      ) : (
        <div className="section">
          {data.patients.length === 0 ? (
            <div className="notification is-danger">
              Patient not found, try to search with phone number or email
              account
            </div>
          ) : (
            data.patients.map(patient => (
              <div key={patient.name} className="box">
                <PatientsListCard
                  name={patient.name}
                  surname={patient.surname}
                  id={patient.id}
                  image={patient.image}
                />
              </div>
            ))
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default withRouter(connect()(PatientsList));
