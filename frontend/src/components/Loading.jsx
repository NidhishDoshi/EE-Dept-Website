import PropTypes from "prop-types";

export default function Loading({
  children = "Loading...",
  className = "",
  spinnerColor = "text-primary-500",
  spinnerSize = "h-8 w-8",
  ...props
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center m-10 ${className}`}
      aria-live="polite"
      {...props}
    >
      <div className="flex items-center justify-center mb-3">
        <svg
          className={`animate-spin ${spinnerSize} ${spinnerColor}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
      <span className="text-gray-700 text-base font-medium">{children}</span>
    </div>
  );
}

Loading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  spinnerColor: PropTypes.string,
  spinnerSize: PropTypes.string,
};
