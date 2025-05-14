export const LockIcon = ({ className = "", strokeWidth = 1.5 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Lock body */}
    <rect x="5" y="11" width="14" height="10" rx="2" />
    {/* Lock top */}
    <path d="M12 15v2" /> {/* Keyhole */}
    <path d="M8 11V7a4 4 0 0 1 8 0v4" /> {/* Top arc */}
  </svg>
);
