import React from "react";
import PropTypes from "prop-types";

export const InputF = ({
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
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={e => handleChange(e)}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

InputF.propTypes={
  handleChange: PropTypes.func
}