// src/components/Register.js
import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/auth/register", {
        name,
        email,
        password,
      });
      alert("Inscription réussie");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow mb-4"
    >
      <h2 className="text-2xl font-bold mb-4">S'inscrire</h2>
      <input
        type="text"
        placeholder="Nom"
        className="border rounded w-full p-2 mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border rounded w-full p-2 mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="border rounded w-full p-2 mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-500 text-white w-full py-2 rounded"
      >
        S'inscrire
      </button>
    </form>
  );
};

export default Register;
