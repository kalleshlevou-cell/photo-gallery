/**
 * SearchBar — controlled input for filtering photos by author name.
 * Props:
 *   value    : string  — current search term
 *   onChange : function(newValue: string) => void
 */
function SearchBar({ value, onChange }) {
  return (
    <div className="relative max-w-md w-full">
      {/* Search icon */}
      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by author name…"
        aria-label="Search photos by author name"
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
      />

      {/* Clear button — appears only when there is text */}
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default SearchBar
