/**
 * ErrorMessage — shown when the API fetch fails.
 * Props:
 *   message : string — the error text to display
 */
function ErrorMessage({ message }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 gap-3"
      role="alert"
    >
      {/* Warning icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z"
        />
      </svg>
      <p className="text-lg font-semibold text-red-500">Oops! Something went wrong.</p>
      <p className="text-sm text-gray-500 max-w-xs text-center">{message}</p>
    </div>
  )
}

export default ErrorMessage
