import React, { useId } from "react";

const TextAreaBox = React.forwardRef(
  ({ label, className = "", rows = 4, ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label className="inline-block mb-1 pl-1" htmlFor={id}>
            {label}
          </label>
        )}
        <textarea
          className={` resize-none ${className}`}
          id={id}
          rows={rows}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default TextAreaBox;
