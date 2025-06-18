// src/components/MoviesList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5001/movies");
        console.log("response", response.data);
        setMovies(response.data.results || response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold">{movie.title}</h2>
          <p className="text-gray-600">ID : {movie.id}</p>
          <p className="text-gray-600">Note : {movie.vote_average}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-1/2 rounded mt-2 justify-self-center mb-4"
          />

          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
