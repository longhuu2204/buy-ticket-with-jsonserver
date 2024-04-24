import React from "react";

const Button = ({
  onClick,
  className,
  type = "button",
  bgColor = "primary",
  children,
  full = false,
  disabled = false,
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    case "disabled":
      bgClassName = "bg-disabled";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-2 rounded-lg capitalize mt-auto ${
        full ? "w-full" : ""
      } ${bgClassName} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
