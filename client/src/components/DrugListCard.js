import React from "react";
import { Link } from "react-router-dom";

export const DrugListCard = ({ drug }) => {
  return (
    <div className="column">
      <div className="box">
        <article className="media">
          <div className="media-left" />
          <div className="content">
            <p>
              <strong>{drug.nombre}</strong>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};
