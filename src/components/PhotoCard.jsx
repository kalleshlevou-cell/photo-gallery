/**
 * PhotoCard — displays a single photo with author name and a favourite heart button.
 *
 * Props:
 *   photo           : object  — Picsum photo object { id, author, download_url, width, height }
 *   isFavourite     : boolean — whether this photo is currently favourited
 *   onToggleFav     : function(id: string) => void — called when heart is clicked
 */
function PhotoCard({ photo, isFavourite, onToggleFav }) {
  // Build a consistently-sized thumbnail via the Picsum resize API
  const thumbnailUrl = `https://picsum.photos/id/${photo.id}/400/300`

  return (
    <article className="group relative rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow duration-300">
      {/* Photo */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={thumbnailUrl}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Heart button — overlaid top-right corner */}
        <button
          onClick={() => onToggleFav(photo.id)}
          aria-label={
            isFavourite
              ? `Remove ${photo.author}'s photo from favourites`
              : `Add ${photo.author}'s photo to favourites`
          }
          aria-pressed={isFavourite}
          className={`
            absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all duration-200
            ${isFavourite
              ? 'bg-red-500 text-white scale-110 shadow-lg'
              : 'bg-white/70 text-gray-400 hover:bg-red-50 hover:text-red-400'}
          `}
        >
          {/* Filled heart when favourited, outline heart otherwise */}
          {isFavourite ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Author name */}
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-gray-700 truncate" title={photo.author}>
          {photo.author}
        </p>
        {isFavourite && (
          <span className="inline-flex items-center gap-1 mt-1 text-xs text-red-500 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
            Favourited
          </span>
        )}
      </div>
    </article>
  )
}

export default PhotoCard
