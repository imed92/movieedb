// src/App.js
import React from "react";
import MoviesSearchPagination from "./components/MoviesSearchPagination";
import Login from "./components/Login";
import Register from "./components/Register";
import ReservationForm from "./components/ReservationForm";

function App() {
  const token = localStorage.getItem("moviie_auth_token");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">MoviieBooker</h1>
      {token ? (
        <>
          <MoviesSearchPagination />
          <ReservationForm token={token} />
        </>
      ) : (
        <>
          <Login />
          <Register />
        </>
      )}
    </div>
  );
}

export default App;
