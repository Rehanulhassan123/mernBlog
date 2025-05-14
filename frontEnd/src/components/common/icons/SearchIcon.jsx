export const SearchIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    className={className}
    fill="currentColor" // Inherit color from parent
  >
    <circle
      cx="11"
      cy="11"
      r="6" // Reduced radius for smaller circle
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <line
      x1="15.5"
      y1="15.5"
      x2="21"
      y2="21"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
