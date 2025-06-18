// src/components/MoviesSearchPagination.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const MoviesSearchPagination = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // pageSize peut être un nombre ou 'all'
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Récupère les films via l'API avec recherche et pagination
  const fetchMovies = async () => {
    try {
      const params = {
        page,
        search,
      };
      const response = await axios.get("http://localhost:5001/movies", {
        params,
      });
      // Supposons que l'API renvoie { results: [...], total_pages: X }
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages || 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search, page]);

  // Si pageSize n'est pas "all", on limite les résultats affichés
  const displayedMovies =
    pageSize === "all" ? movies : movies.slice(0, pageSize);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-4">
      {/* Barre de recherche et sélection du nombre d'éléments */}
      <div className="mb-4 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Rechercher un film..."
          className="border rounded p-2 flex-1"
          value={search}
          onChange={handleSearchChange}
        />
        <select
          value={pageSize}
          onChange={(e) =>
            setPageSize(
              e.target.value === "all" ? "all" : parseInt(e.target.value, 10)
            )
          }
          className="border rounded p-2"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="all">Tout</option>
        </select>
      </div>

      {/* Liste des films */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {displayedMovies.map((movie) => (
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

      {/* Contrôles de pagination (affichés seulement si pageSize n'est pas "all") */}
      {pageSize !== "all" && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-300 rounded"
            disabled={page === 1}
          >
            Précédent
          </button>
          <span className="px-3 py-1">
            Page {page} sur {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 bg-gray-300 rounded"
            disabled={page === totalPages}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default MoviesSearchPagination;
