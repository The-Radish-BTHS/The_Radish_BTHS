import React from "react"
import "./SearchBar.css"

export default function SearchBar({
  // searchQuery,
  setSearchQuery
}) {
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
            // value={searchQuery}
            onInput={(e) => {
              setTimeout(() => setSearchQuery(e.target.value), 1000)
            }}
            type="text"
            id="search"
            placeholder="Find a radish or your pet bird..."
            name="s"
            autoFocus // Makes tabbing into search weird but it's so cool
        />
    </form>
  )
}
