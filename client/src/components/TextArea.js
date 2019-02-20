import React from "react";

export const TextArea = ({
  label,
  name,
  rows,
  cols,
  value,
  handleChange,
  placeholder,
  help
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>

      <div className="control">
        <textarea
          className="textarea is-shadowless is-radiusless"
          name={name}
          rows={rows}
          cols={cols}
          value={value}
          onChange={e => handleChange(e)}
          placeholder={placeholder}
        />
        <p className="help">{help}</p>
      </div>
    </div>
  );
};
