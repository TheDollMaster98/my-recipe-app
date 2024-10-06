import React from "react";
import { getSessionData, removeSessionData } from "../api/session";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const user = getSessionData("user");

  const handleDeleteProfile = () => {
    removeSessionData("user");
    navigate("/login");
    alert("Profilo eliminato con successo!");
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-white">
      <h2 className="mb-6 text-2xl font-bold text-black">Profilo Utente</h2>
      {user ? (
        <div className="w-full max-w-md mt-4 text-black">
          <p>Benvenuto, {user.username}!</p>
          <p>Email: {user.email}</p>
          <button
            onClick={handleDeleteProfile}
            className="w-full p-3 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Elimina Profilo
          </button>
        </div>
      ) : (
        <p>Nessun utente loggato.</p>
      )}
    </div>
  );
};

export default UserProfilePage;
