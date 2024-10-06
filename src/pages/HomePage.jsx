import React, { useEffect, useState } from 'react';
import { getRandomMeal } from '../api/mealApi';
import RecipeCard from '../components/RecipeCard';
import { setSessionData, getSessionData } from '../api/session'; // Importa le funzioni

const HomePage = () => {
  const [allMeals, setAllMeals] = useState([]);
  const [numMeals, setNumMeals] = useState(12);

  useEffect(() => {
    const fetchInitialMeals = async () => {
      const cachedMeals = getSessionData('allMeals'); // Usa la funzione per ottenere i dati
      if (cachedMeals) {
        setAllMeals(cachedMeals);
      } else {
        const mealPromises = Array.from({ length: numMeals }, () => getRandomMeal());
        const results = await Promise.all(mealPromises);
        setAllMeals(results);
        setSessionData('allMeals', results); // Usa la funzione per memorizzare i dati
      }
    };

    fetchInitialMeals();
  }, []); // Esegui solo al montaggio del componente

  useEffect(() => {
    const addRandomMeal = async () => {
      const newMeal = await getRandomMeal();
      setAllMeals(prevMeals => [...prevMeals, newMeal]);
    };

    if (allMeals.length < numMeals) {
      addRandomMeal();
    }
  }, [numMeals, allMeals.length]); // Esegui quando numMeals cambia

  return (
    <div className="min-h-screen bg-black-1">      
      <div className="container p-4 mx-auto mt-8">
        <h2 className="text-2xl font-bold text-center">Ricette Popolari</h2>
        <div className="flex justify-center mt-4">
          <label htmlFor="numMeals" className="mr-2">Numero di ricette da mostrare:</label>
          <input
            id="numMeals"
            type="number"
            min="0"
            value={numMeals}
            onChange={(e) => setNumMeals(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allMeals.slice(0, numMeals).map(meal => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">Iscriviti alla nostra Newsletter</h2>
          <input
            type="email"
            placeholder="Inserisci la tua email"
            className="p-2 mt-2 border border-gray-300 rounded"
          />
          <button className="p-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Iscriviti
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
