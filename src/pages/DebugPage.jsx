import React, { useState } from "react";
import { getLocalData, getSessionData } from "../api/auth"; 
import { getAllMealsFromCache } from "../api/storage"; 

const DebugPage = () => {
  const [localStorageData, setLocalStorageData] = useState(getLocalData("users") || {});
  const [sessionStorageData, setSessionStorageData] = useState(getSessionData("user") || {});
  const [cachedMeals, setCachedMeals] = useState(getAllMealsFromCache());

  // Funzione per cancellare i dati
  const clearAllData = () => {
    localStorage.clear();
    sessionStorage.clear();
    setLocalStorageData({});
    setSessionStorageData({});
    setCachedMeals([]);
    alert("Tutti i dati di storage sono stati cancellati!");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="mb-6 text-3xl font-bold text-center text-black">Debug & Storage Info</h2>

      {/* Bottone per cancellare tutto con icona del cestino */}
      <div className="flex justify-center mb-6">
        <button
          onClick={clearAllData}
          className="flex items-center p-3 text-white bg-red-500 rounded hover:bg-red-600"
        >
          <span className="mr-2 material-icons">delete</span> Cancella Tutto
        </button>
      </div>

      {/* Local Storage */}
      <div className="p-4 mb-4 bg-white rounded shadow-lg">
        <h3 className="text-xl font-semibold">Local Storage</h3>
        <pre className="p-2 bg-gray-200 rounded">{JSON.stringify(localStorageData, null, 2)}</pre>
      </div>

      {/* Session Storage */}
      <div className="p-4 mb-4 bg-white rounded shadow-lg">
        <h3 className="text-xl font-semibold">Session Storage</h3>
        <pre className="p-2 bg-gray-200 rounded">{JSON.stringify(sessionStorageData, null, 2)}</pre>
      </div>

      {/* Cache */}
      <div className="p-4 mb-4 bg-white rounded shadow-lg">
        <h3 className="text-xl font-semibold">Cache in Memoria</h3>
        <pre className="p-2 bg-gray-200 rounded">{JSON.stringify(cachedMeals, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DebugPage;
