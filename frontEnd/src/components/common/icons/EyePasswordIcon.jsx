export const EyePasswordIcon = ({
  className = "",
  strokeWidth = 1.5,
  isPasswordVisible = false,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24" // Increased from 22
    height="24" // Increased from 22
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Scaled-up eye shape */}
    <path d="M12 6.5c-4.2 0-7.8 3.2-9 5.5 1.2 2.3 4.8 5.5 9 5.5s7.8-3.2 9-5.5c-1.2-2.3-4.8-5.5-9-5.5z" />

    {/* Proportionally larger pupil */}
    <circle cx="12" cy="12" r="3" />

    {/* Adjusted slash */}
    {!isPasswordVisible && <path d="M6 6l12 12" />}
  </svg>
);
