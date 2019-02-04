import React from "react";
import { Link } from "react-router-dom";

export const PatientsListCard = ({ patient }) => {
  return (
    <div className="column">
     
        <div className="box">
          <article className="media">
            <div className="media-left">
              
            </div>
            <div className="content">
              <p>
                <strong>{patient.name} {patient.surname}</strong>
              </p>
    
              <Link to={`/patient/${patient._id}`}>
              <button className="button is-warning"><span><i className="far fa-eye"></i></span>See Record</button>
              </Link>
            </div>
          </article>
        </div>
     
    </div>
  );
};