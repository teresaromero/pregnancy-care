import React from "react";
import PropTypes from "prop-types";

export const InputP = ({
  htmlFor,
  id,
  name,
  value,
  type,
  placeholder,
  label,
  handleChange,
  disabled
}) => {
  return (
    <React.Fragment>
      <div className="field" htmlFor={htmlFor}>
        <label className="label">{label}</label>
        <p className="control">
          <input
            className="input"
            id={id}
            name={name}
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={e => handleChange(e)}
            disabled={disabled}
          />
        </p>
      </div>
    </React.Fragment>
  );
};

InputP.propTypes={
  handleChange: PropTypes.func
}