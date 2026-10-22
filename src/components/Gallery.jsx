import { useState, useCallback, useMemo } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import useFavourites from '../hooks/useFavourites'
import SearchBar from './SearchBar'
import PhotoCard from './PhotoCard'
import Spinner from './Spinner'
import ErrorMessage from './ErrorMessage'

/**
 * Gallery — the main page component.
 *
 * Responsibilities:
 *   1. Delegates data-fetching to useFetchPhotos (custom hook)
 *   2. Delegates favourites state to useFavourites (useReducer + localStorage)
 *   3. Manages the search term (useState — single primitive, so useState is fine here)
 *   4. useCallback — memoises the search-input handler so it keeps a stable reference
 *      across renders and does not recreate a new function on every render cycle.
 *   5. useMemo — computes the filtered photo list only when `photos` or `searchTerm`
 *      actually change, not on every render. This prevents re-filtering the full array
 *      on unrelated state updates (e.g. toggling a heart).
 */
function Gallery() {
  // ── Data ──────────────────────────────────────────────────────────────────
  const { photos, loading, error } = useFetchPhotos()
  const { favourites, toggleFavourite } = useFavourites()

  // ── Search term ───────────────────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState('')

  // useCallback: memoises the handler so <SearchBar> receives a stable function
  // reference. Without it, a new function would be created on every Gallery render,
  // which would force SearchBar to re-render even when nothing search-related changed.
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value)
  }, []) // No dependencies — the setter from useState is always stable

  // useMemo: recomputes the filtered list only when `photos` or `searchTerm` change.
  // Toggling a favourite changes `favourites` but not `photos` or `searchTerm`,
  // so the filter work is skipped on those renders — keeping the UI snappy even
  // with many photos and a complex filter.
  const filteredPhotos = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase()
    if (!trimmed) return photos
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(trimmed)
    )
  }, [photos, searchTerm])

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Camera icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Photo Gallery</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Favourites count badge */}
            {favourites.length > 0 && (
              <span className="flex items-center gap-1.5 text-sm text-red-500 font-medium bg-red-50 px-3 py-1.5 rounded-full border border-red-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
                {favourites.length} {favourites.length === 1 ? 'Favourite' : 'Favourites'}
              </span>
            )}

            <SearchBar value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading state */}
        {loading && <Spinner />}

        {/* Error state */}
        {!loading && error && <ErrorMessage message={error} />}

        {/* Empty-search state */}
        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-2 text-center">
            <p className="text-lg font-semibold text-gray-500">No photos found</p>
            <p className="text-sm text-gray-400">
              No authors match &ldquo;{searchTerm}&rdquo;. Try a different name.
            </p>
          </div>
        )}

        {/* Photo grid
            - 1 column  on mobile  (default)
            - 2 columns on tablet  (sm breakpoint, ≥640px)
            - 4 columns on desktop (lg breakpoint, ≥1024px)
        */}
        {!loading && !error && filteredPhotos.length > 0 && (
          <>
            <p className="text-sm text-gray-400 mb-5">
              Showing {filteredPhotos.length} of {photos.length} photos
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavourite={favourites.includes(photo.id)}
                  onToggleFav={toggleFavourite}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="mt-16 py-6 border-t border-gray-200 text-center text-xs text-gray-400">
        Photos from{' '}
        <a
          href="https://picsum.photos"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-indigo-500 transition-colors"
        >
          Picsum Photos
        </a>
      </footer>
    </div>
  )
}

export default Gallery
