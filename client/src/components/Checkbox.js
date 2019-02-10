import React from "react";

export const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div class="control">
    <label class="checkbox">
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={(e)=>onCheckboxChange(e)}
      />
      {label}
    </label>
  </div>
);
