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
  disabled,
  required,
  min,
  max,
  help
}) => {
  return (
    <React.Fragment>
      <div className="field" htmlFor={htmlFor}>
        <label className="label">{label}</label>
        <p className="control">
          <input
            className="input is-shadowless is-radiusless	"
            id={id}
            name={name}
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={e => handleChange(e)}
            disabled={disabled}
            required={required}
            min={min}
            max={max}
          />
        </p>
        <p className="help">
        {help}
        </p>
      </div>
    </React.Fragment>
  );
};

InputP.propTypes = {
  handleChange: PropTypes.func
};
