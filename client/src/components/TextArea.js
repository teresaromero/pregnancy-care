import React from "react";

export const TextArea = ({label,name,rows,cols,value,handleChange,placeholder}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>

      <div className="control">
        <textarea
          className="textarea"
          name={name}
          rows={rows}
          cols={cols}
          value={value}
          onChange={(e)=>handleChange(e)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};