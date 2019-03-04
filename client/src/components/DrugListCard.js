import React from "react";
import moment from "moment";
import cx from "classnames";

export const DrugListCard = ({ drug }) => {
  let prescriptionClass = cx("icon is-large", {
    "has-text-danger": drug.receta
  });
  let drivingClass = cx("icon is-large", { "has-text-danger": drug.conduc });
  let sellingClass = cx(
    "icon is-large",
    { "has-text-danger": !drug.comerc },
    { "has-text-success": drug.comerc }
  );

  return (
    <div className="card" style={{marginBottom:'1rem'}}>
      <header className="card-header">
        <span
          className="card-header-icon is-paddingless"
          aria-label="more options"
        >
          <span className={prescriptionClass}>
            <i className="fas fa-user-md" aria-hidden="true" />
          </span>
        </span>
        <span
          className="card-header-icon is-paddingless"
          aria-label="more options"
        >
          <span className={drivingClass}>
            <i className="fas fa-car-crash" aria-hidden="true" />
          </span>
        </span>

        <span
          className="card-header-icon is-paddingless"
          aria-label="more options"
        >
          <span className={sellingClass}>
            <i className="fas fa-shopping-cart" aria-hidden="true" />
          </span>
        </span>
      </header>
      <div className="card-content">
        <div className="content">
          <p className="is-size-6	is-paddingless is-marginless">{drug.nombre}</p>
          <p className="is-size-7 has-text-grey	is-paddingless is-marginless">
            Owner Lab: {drug.labtitular}
          </p>

          <React.Fragment>
            {drug.estado.aut ? (
              <p className="is-size-7 has-text-grey is-paddingless">
                Authorised since: {moment(drug.estado.aut).format("DD/MM/YYYY")}
              </p>
            ) : null}
            {drug.estado.rev ? (
              <p className="is-size-7 has-text-grey is-paddingless">
                Revoked since: {moment(drug.estado.rev).format("DD/MM/YYYY")}
              </p>
            ) : null}
            {drug.estado.susp ? (
              <p className="is-size-7 has-text-grey is-paddingless">
                Suspended since: {moment(drug.estado.susp).format("DD/MM/YYYY")}
              </p>
            ) : null}
          </React.Fragment>

          {drug.docs.map(doc => (
            <a
              key={doc.tipo}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon">
                <i className="fas fa-file-pdf" />
              </span>
              {doc.tipo === 1
                ? "Data Sheet"
                : doc.tipo === 2
                ? "Prospectus"
                : doc.tipo === 3
                ? "Public Evaluation Report"
                : "Risk Management Plan"}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
