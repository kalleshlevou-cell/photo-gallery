import { useReducer, useEffect } from 'react'

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

/**
 * favouritesReducer manages an array of photo IDs that the user has hearted.
 *
 * Supported actions:
 *   { type: 'TOGGLE', payload: id }  — adds the id if missing, removes it if present
 *   { type: 'INIT',   payload: ids } — replaces the entire list (used to hydrate from localStorage)
 */
function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      const id = action.payload
      // If already a favourite — remove it; otherwise — add it
      const isFav = state.includes(id)
      return isFav ? state.filter((favId) => favId !== id) : [...state, id]
    }
    case 'INIT': {
      return action.payload
    }
    default:
      return state
  }
}

// ---------------------------------------------------------------------------
// Custom hook
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'photo-gallery-favourites'

/**
 * Custom hook that wraps useReducer + localStorage persistence for favourites.
 * Returns { favourites, toggleFavourite }.
 *
 * - favourites      : string[] of photo IDs that are currently favourited
 * - toggleFavourite : function(id: string) => void
 */
function useFavourites() {
  const [favourites, dispatch] = useReducer(favouritesReducer, [])

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          dispatch({ type: 'INIT', payload: parsed })
        }
      }
    } catch {
      // If localStorage is corrupted or unavailable, start with an empty list
    }
  }, [])

  // Persist to localStorage whenever the favourites list changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
    } catch {
      // Ignore write errors (e.g. private browsing quota exceeded)
    }
  }, [favourites])

  function toggleFavourite(id) {
    dispatch({ type: 'TOGGLE', payload: id })
  }

  return { favourites, toggleFavourite }
}

export default useFavourites
