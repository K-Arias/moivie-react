import React, { useEffect, useState } from "react"

import Controls from "./parts/Controls"
import MovieCard from "./parts/MovieCard"
import Pagination from "./parts/Pagination"


function App() {

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzdlZjdmZTc1NzU0NDM1NmNlZjYzNTQ4MDgxMGY5MCIsIm5iZiI6MTc3MzAxMjgzNC4yNTUsInN1YiI6IjY5YWUwNzYyMTUyMDZkNWFjOTRlYjEzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fArhTdc9FtlWLpWaDUj5Djq4Ns0YtGKzAfzuAlk6abc"


  const [list, setList] = useState([])
  const [page, setPage] = useState(1)

  const [maxPage, setMaxPage] = useState(1)

  const [mode, setMode] = useState("popular")
  const [text, setText] = useState("")

  const [sort, setSort] = useState("")

  const limit = 100



  useEffect(() => {

    load(page)

  }, [page, mode, text])



  function load(p) {

    let url = ""

    if (mode === "search" && text.trim() !== "") {

      url =
        "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(text) +
        "&language=en-US&page=" + p

    } else {

      url =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=" + p
    }


    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => {

        let stuff = data.results || []

        let pages = data.total_pages || 1

        if (pages > limit) pages = limit


        stuff = doSort(stuff, sort)

        setList(stuff)

        setPage(data.page || 1)
        setMaxPage(pages)

      })
      .catch(err => {
        console.log("bad fetch", err)
      })
  }



  function doSort(arr, type) {

    let copy = [...arr]

    if (type === "releaseAsc") {

      copy.sort((a, b) =>
        new Date(a.release_date || "1900") -
        new Date(b.release_date || "1900")
      )
    }

    else if (type === "releaseDesc") {

      copy.sort((a, b) =>
        new Date(b.release_date || "1900") -
        new Date(a.release_date || "1900")
      )
    }

    else if (type === "ratingAsc") {

      copy.sort((a, b) =>
        (a.vote_average || 0) - (b.vote_average || 0)
      )
    }

    else if (type === "ratingDesc") {

      copy.sort((a, b) =>
        (b.vote_average || 0) - (a.vote_average || 0)
      )
    }

    return copy
  }



  function searchChange(e) {

    const val = e.target.value

    setText(val)
    setPage(1)

    if (val.trim() === "") {
      setMode("popular")
    } else {
      setMode("search")
    }
  }


  function sortChange(e) {

    const s = e.target.value

    setSort(s)

    let temp = doSort(list, s)
    setList(temp)
  }



  function prev() {

    if (page > 1) {
      setPage(page - 1)
    }
  }


  function next() {

    if (page < maxPage) {
      setPage(page + 1)
    }
  }



  return (
    <div>

      <header className="top-header">
        <h1>Movie Explorer</h1>
      </header>


      <Controls
        searchText={text}
        sortType={sort}
        onSearchChange={searchChange}
        onSortChange={sortChange}
      />


      <main>

        <div className="movie-grid">

          {list.map(m => (
            <MovieCard key={m.id} movie={m} />
          ))}

        </div>

      </main>


      <Pagination
        currentPage={page}
        totalPages={maxPage}
        onPrev={prev}
        onNext={next}
      />

    </div>
  )
}

export default App