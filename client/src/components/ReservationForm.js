// src/components/ReservationForm.js
import React, { useState } from "react";
import axios from "axios";

const ReservationForm = ({ token }) => {
  const [movieId, setMovieId] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5001/reservations",
        { movieId: parseInt(movieId, 10), timeSlot },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Réservation créée");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la réservation");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow mt-4"
    >
      <h2 className="text-2xl font-bold mb-4">Réserver un film</h2>
      <input
        type="number"
        placeholder="Movie ID"
        className="border rounded w-full p-2 mb-4"
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
      />
      <input
        type="datetime-local"
        className="border rounded w-full p-2 mb-4"
        value={timeSlot}
        onChange={(e) => setTimeSlot(e.target.value)}
      />
      <button
        type="submit"
        className="bg-purple-500 text-white w-full py-2 rounded"
      >
        Réserver
      </button>
    </form>
  );
};

export default ReservationForm;
