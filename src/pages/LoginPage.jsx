import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser, isUserLoggedIn } from "../api/session";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const result = loginUser(email, password);
    if (result.success) {
      navigate("/profile");
    } else {
      alert(result.message);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      alert("Il nickname è obbligatorio!");
      return;
    }
    const result = registerUser(email, password, username);
    alert(result.message);
    if (result.success) setShowRegister(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-white">
      <h2 className="mb-6 text-2xl font-bold text-black">
        {showRegister ? "Registrazione" : "Login"}
      </h2>
      <div className="w-full max-w-md mt-4 text-black">
        {!showRegister ? (
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
            <button type="submit" className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Nickname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-200 border border-gray-400 rounded-lg focus:outline-none"
              required
            />
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
            <button type="submit" className="w-full p-3 text-white bg-green-500 rounded-lg hover:bg-green-600">
              Registrati
            </button>
          </form>
        )}
        <p className="mt-6 text-lg text-center">
          {showRegister ? "Hai già un account?" : "Non hai un account?"}
        </p>
        <button
          onClick={() => setShowRegister(!showRegister)}
          className="w-full p-3 mt-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
        >
          {showRegister ? "Torna al Login" : "Registrati"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
