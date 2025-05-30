import React, { useState } from "react";
import { getLocalData, getLoggedUser } from "../api/auth"; 
import { getAllMealsFromCache } from "../api/storage"; 

const DebugPage = () => {
  const [localStorageData, setLocalStorageData] = useState(getLocalData("users") || {});
  const [sessionStorageData, setSessionStorageData] = useState(getLoggedUser("user") || {});
  const [cachedMeals, setCachedMeals] = useState(getAllMealsFromCache());

  const user = getLoggedUser();
  const savedRecipes = user ? getLocalData(`recipes_${user.email}`) : [];

  const clearAllData = () => {
    localStorage.clear();
    sessionStorage.clear();
    setLocalStorageData({});
    setSessionStorageData({});
    setCachedMeals([]);
    alert("Tutti i dati di storage sono stati cancellati!");
  };

  const clearUserRecipes = () => {
    if (user) {
      localStorage.removeItem(`recipes_${user.email}`);
      alert("Ricettario dell'utente cancellato.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="mb-6 text-3xl font-bold text-center text-black">Debug & Storage Info</h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={clearAllData}
          className="flex items-center p-3 text-white bg-red-500 rounded hover:bg-red-600"
        >
          <span className="mr-2 material-icons">delete</span> Cancella Tutto
        </button>

        {user && (
          <button
            onClick={clearUserRecipes}
            className="flex items-center p-3 text-white bg-yellow-500 rounded hover:bg-yellow-600"
          >
            <span className="mr-2 material-icons">remove_circle</span> Cancella Ricettario
          </button>
        )}
      </div>

      <div className="p-4 mb-4 bg-white rounded shadow-lg">
        <h3 className="text-xl font-semibold">Local Storage</h3>
        <pre className="p-2 overflow-x-auto bg-gray-200 rounded">{JSON.stringify(localStorageData, null, 2)}</pre>
      </div>

      <div className="p-4 mb-4 bg-white rounded shadow-lg">
        <h3 className="text-xl font-semibold">Session Storage</h3>
        <pre className="p-2 overflow-x-auto bg-gray-200 rounded">{JSON.stringify(sessionStorageData, null, 2)}</pre>
      </div>

      {user && (
        <div className="p-4 mb-4 bg-white rounded shadow-lg">
          <h3 className="text-xl font-semibold">Ricettario Utente ({user.email})</h3>
          <pre className="p-2 overflow-x-auto bg-gray-200 rounded">{JSON.stringify(savedRecipes, null, 2)}</pre>
        </div>
      )}

      <div className="p-4 mb-4 bg-white rounded shadow-lg">
        <h3 className="text-xl font-semibold">Cache in Memoria</h3>
        <pre className="p-2 overflow-x-auto bg-gray-200 rounded">{JSON.stringify(cachedMeals, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DebugPage;
