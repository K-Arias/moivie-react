import React from "react"

function Pagination({ currentPage, totalPages, onPrev, onNext }) {

  return (
    <section className="pagination">

      <button onClick={onPrev}>Prev</button>

      <p>Page {currentPage} / {totalPages}</p>

      <button onClick={onNext}>Next</button>

    </section>
  )
}

export default Pagination