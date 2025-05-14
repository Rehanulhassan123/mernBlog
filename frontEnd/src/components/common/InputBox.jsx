import React, { useId } from "react";

const InputBox = React.forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label className="inline-block mb-1 pl-1" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={`${className}`}
          id={id}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default InputBox;
