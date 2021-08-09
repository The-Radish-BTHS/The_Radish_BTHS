import React from "react"
import "./SearchBar.css"

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <form
        action="/search"
        method="get"
        autoComplete="off"
        className="search-form"
        id="search-form"
    >
        <label htmlFor="search">Find the Radish article of your dreams</label>
        <input
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.target.value)}
            type="text"
            id="search"
            placeholder="Search The Radish..."
            name="s"
            autoFocus
        />
    </form>
  )
}
