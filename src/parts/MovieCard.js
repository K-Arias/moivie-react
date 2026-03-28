import React from "react"

function MovieCard({ movie }) {

  let img = ""

  if (movie.poster_path) {
    img = "https://image.tmdb.org/t/p/w500" + movie.poster_path
  } else {
    img = "https://via.placeholder.com/250x370?text=No+Image"
  }


  return (
    <div className="movie-card">

      <img src={img} alt="" />

      <h2>{movie.title}</h2>

      <p>Release: {movie.release_date || "N/A"}</p>

      <p>Rating: {movie.vote_average || "N/A"}</p>

    </div>
  )
}

export default MovieCard