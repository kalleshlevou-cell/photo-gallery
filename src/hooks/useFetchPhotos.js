import { useState, useEffect } from 'react'

/**
 * Custom hook that fetches 30 photos from the Picsum Photos API.
 * Returns { photos, loading, error }.
 *
 * - photos  : array of photo objects from the API (empty array while loading or on error)
 * - loading : true while the request is in-flight
 * - error   : error message string if the fetch failed, null otherwise
 */
function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // AbortController lets us cancel the fetch if the component unmounts
    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          'https://picsum.photos/v2/list?limit=30',
          { signal: controller.signal }
        )

        // Treat any non-2xx status as an error
        if (!response.ok) {
          throw new Error(`Failed to fetch photos (HTTP ${response.status})`)
        }

        const data = await response.json()
        setPhotos(data)
      } catch (err) {
        // Ignore AbortError — it just means the component unmounted mid-flight
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong. Please try again.')
        }
      } finally {
        // Only clear the loading flag if the request was not aborted
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchPhotos()

    // Cleanup: abort the in-flight request when the component unmounts
    return () => controller.abort()
  }, []) // Empty dependency array — fetch once on mount

  return { photos, loading, error }
}

export default useFetchPhotos
