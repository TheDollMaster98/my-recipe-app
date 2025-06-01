import React, { useEffect, useState } from "react";
import { getLoggedUser, logoutUser, updateUserProfile } from "../api/auth";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    const loggedUser = getLoggedUser("user");
    console.log("🔹 Utente caricato nel profilo:", loggedUser);

    if (!loggedUser) {
      console.warn("Nessun utente trovato, reindirizzamento a /login");
      navigate("/login");
    } else {
      setUser(loggedUser);
      setNewUsername(loggedUser.username); // Inizializza il campo di input con il nome attuale
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    console.log("Logout effettuato!");
    navigate("/login");
  };

  const handleUpdateUsername = () => {
    if (!newUsername.trim()) {
      alert("Il nome utente non può essere vuoto!");
      return;
    }

    const result = updateUserProfile(newUsername);
    if (result.success) {
      setUser(getLoggedUser("user")); // Aggiorna lo stato con il nuovo utente
      console.log("Nome utente aggiornato:", newUsername);
    } else {
      alert(result.message);
    }
  };
  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <h2 className="mb-6 text-3xl font-bold text-black">Profilo Utente</h2>
      {user ? (
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          {/* Sezione Informazioni Utente */}
          <div className="text-center">
            <p className="text-lg">Benvenuto,</p>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full p-2 mt-1 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <p className="mt-1 text-gray-600">{user.email}</p>

            <button
              onClick={handleUpdateUsername}
              className="w-full p-2 mt-3 text-white transition-all bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Aggiorna Nome
            </button>
          </div>

          {/* Bottone Logout */}
          <button onClick={handleLogout} className="w-full p-3 mt-6 text-white bg-red-500 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      ) : (
        <p>Nessun utente loggato.</p>
      )}
    </div>
  );
};

export default UserProfilePage;
