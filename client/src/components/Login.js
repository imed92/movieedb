// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5001/auth/login", {
        email,
        password,
      });
      localStorage.setItem("moviie_auth_token", data.access_token);
      // refresh the page
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow mb-4"
    >
      <h2 className="text-2xl font-bold mb-4">Se connecter</h2>
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
        className="bg-blue-500 text-white w-full py-2 rounded"
      >
        Se connecter
      </button>
    </form>
  );
};

export default Login;
