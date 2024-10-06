import React, { useState } from "react";
import { setSessionData, getSessionData } from "../api/session"; // Assicurati di avere una funzione per gestire la sessione
import { useNavigate } from "react-router-dom";

const users = []; // Array per memorizzare gli utenti registrati

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Verifica se l'utente esiste
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setSessionData("user", { email: user.email, username: user.username }); // Salva i dati dell'utente nella sessione
      navigate("/profile"); // Reindirizza alla pagina del profilo
    } else {
      alert("Credenziali non valide");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Verifica se l'email è già registrata
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      alert("Email già registrata");
      return;
    }

    // Aggiungi il nuovo utente all'array
    const newUser = { email, password, username: "User di Prova" }; // Puoi personalizzare il nome utente
    users.push(newUser);
    alert("Registrazione avvenuta con successo! Puoi ora effettuare il login.");
    setShowRegister(false); // Torna al modulo di login
  };

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-white">
      <h2 className="mb-6 text-2xl font-bold text-black">
        {showRegister ? "Registrazione" : "Login"}
      </h2>
      <div className="w-full max-w-md mt-4 text-black">
        {!showRegister ? (
          <div>
            <p className="mb-6 text-lg">
              Accedi per visualizzare il tuo profilo.
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-200 border border-gray-400 rounded-lg focus:outline-none"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-200 border border-gray-400 rounded-lg focus:outline-none"
                required
              />
              <button
                type="submit"
                className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Login
              </button>
            </form>
            <p className="mt-6 text-lg text-center">Non hai un account?</p>
            <button
              onClick={toggleForm}
              className="w-full p-3 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
              Registrati
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-6 text-lg">
              Registrati per creare un nuovo account.
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-200 border border-gray-400 rounded-lg focus:outline-none"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-200 border border-gray-400 rounded-lg focus:outline-none"
                required
              />
              <button
                type="submit"
                className="w-full p-3 text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Registrati
              </button>
            </form>
            <p className="mt-6 text-lg text-center">Hai già un account?</p>
            <button
              onClick={toggleForm}
              className="w-full p-3 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Torna al Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
