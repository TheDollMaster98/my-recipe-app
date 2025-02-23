import React, { useEffect, useState } from "react";
import { getLoggedUser, logoutUser, updateUserProfile } from "../api/session";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    const loggedUser = getLoggedUser();
    if (loggedUser) {
      setUser(loggedUser);
      setNewUsername(loggedUser.username); // Imposta il nome utente corrente
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleUpdateUsername = () => {
    if (newUsername.trim() === "") {
      alert("Il nickname non può essere vuoto!");
      return;
    }
    const result = updateUserProfile(newUsername);
    alert(result.message);
    if (result.success) {
      setUser({ ...user, username: newUsername }); // Aggiorna lo stato della pagina
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-white">
      <h2 className="mb-6 text-2xl font-bold text-black">Profilo Utente</h2>
      {user ? (
        <div className="w-full max-w-md mt-4 text-black">
          <p>Benvenuto, <strong>{user.username}</strong>!</p>
          <p>Email: {user.email}</p>

          {/* Modifica Nickname */}
          <div className="mt-4">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-lg"
            />
            <button
              onClick={handleUpdateUsername}
              className="w-full p-3 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Aggiorna Nickname
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full p-3 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
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
