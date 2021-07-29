import React from "react"

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <form
        action="/search"
        method="get"
        autoComplete="off"
    >
        <label htmlFor="search">Find stuff. Or don't ig.</label>
        <input
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.target.value)}
            type="text"
            id="search"
            placeholder="Search blog posts"
            name="s"
        />
        <button type="submit">Search</button>
    </form>
  )
}
