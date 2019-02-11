import React from "react";
import PropTypes from "prop-types";

export const InputDiv = ({
  htmlFor,
  id,
  name,
  value,
  type,
  placeholder,
  label,
  handleChange
}) => {
  return (
    <React.Fragment>
      <div className="field" htmlFor={htmlFor}>
        <label className="label">{label}</label>
        <div className="control">
          <input
            className="input"
            id={id}
            name={name}
            value={value || ''}
            type={type}
            placeholder={placeholder}
            onChange={e => handleChange(e)}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

InputDiv.propTypes={
  handleChange: PropTypes.func
}