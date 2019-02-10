import React from "react";
import PropTypes from "prop-types";

export const Checkbox = ({
  type = "checkbox",
  name,
  checked = false,
  onChange
}) => <input type={type} name={name} checked={checked} onChange={onChange} />;

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};
