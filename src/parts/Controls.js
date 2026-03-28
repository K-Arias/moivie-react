import React from "react"

function Controls({ searchText, sortType, onSearchChange, onSortChange }) {

  return (
    <section className="controls">

      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={onSearchChange}
      />


      <select value={sortType} onChange={onSortChange}>

        <option value="">Sort</option>

        <option value="releaseAsc">Release Asc</option>
        <option value="releaseDesc">Release Desc</option>

        <option value="ratingAsc">Rating Asc</option>
        <option value="ratingDesc">Rating Desc</option>

      </select>

    </section>
  )
}

export default Controls