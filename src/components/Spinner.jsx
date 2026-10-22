/**
 * Spinner — shown while photos are loading.
 */
function Spinner() {
  return (
    <div
      className="flex items-center justify-center py-24"
      role="status"
      aria-label="Loading photos"
    >
      <div className="w-14 h-14 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  )
}

export default Spinner
