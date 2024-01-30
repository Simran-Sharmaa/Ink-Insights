import React from "react";
import { forwardRef } from "react";
import { useId } from "react";
const Input = forwardRef(function Input({ label,type = "text", className="",...props },ref) {
    const id = useId();
  return (
    <div className="w-100 ">
        {
            label &&
            <label htmlFor={id} className="form-label mb-3">{label}</label>
        }
        <input type={type} id={id} className={`${className} form-control `  }{...props} ref={ref}/>
    </div>
  )
});

export default Input;
