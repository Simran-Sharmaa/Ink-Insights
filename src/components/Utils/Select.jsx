import React, { forwardRef, useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="mb-3">
      {/* Render label if provided */}
      {label && <label className="mb-3" htmlFor={id}>{label}</label>}

      {/* Render select element with Bootstrap classes and options */}
      <select id={id} className={`form-select ${className}`} {...props} ref={ref}>
        {/* Map through options and create option elements */}
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
