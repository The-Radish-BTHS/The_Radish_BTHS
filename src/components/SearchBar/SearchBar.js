import React from "react"
import "./SearchBar.css"

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <form
        action="/search"
        method="get"
        autoComplete="off"
        className="search-form"
    >
        <label htmlFor="search">
        Search for your heart's desire. Or Radish articles.
        </label>
        <input
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.target.value)}
            type="text"
            id="search"
            placeholder="I want eggs mmm eggs crunch...cruch...crunch..."
            name="s"
        />
    </form>
  )
}
