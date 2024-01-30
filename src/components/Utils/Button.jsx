import React from "react";

function Button({
  children,
  className = "btn-primary",
  type = "button",
  ...props
}) {
  return <button  type={type} className={`${className} btn mt-3`}{...props} >{children}</button>;
}

export default Button;
