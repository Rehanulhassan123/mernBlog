function Button({
  children,
  type = "button",
  className = "",
  textColor = "",
  bgColor = "",
  ...props
}) {
  return (
    <button
      className={`${className} ${bgColor} ${textColor}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
