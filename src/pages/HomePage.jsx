import React, { useEffect, useState, useCallback } from "react";
import { getRandomMeal } from "../api/mealApi";
import RecipeCard from "../components/RecipeCard";
import { setMealInCache, getAllMealsFromCache } from "../api/cache"; // Importa la cache

const HomePage = () => {
  const [allMeals, setAllMeals] = useState([]);
  const [numMeals, setNumMeals] = useState(25);
  const [loading, setLoading] = useState(true); // Stato di caricamento

  useEffect(() => {
    const fetchInitialMeals = async () => {
      const cachedMeals = getAllMealsFromCache(); // Recupera i pasti salvati

      if (cachedMeals.length > 0) {
        setAllMeals(cachedMeals);
        setLoading(false);
      } else {
        const mealPromises = Array.from({ length: numMeals }, () => getRandomMeal());
        const results = await Promise.all(mealPromises);
        setAllMeals(results);
        results.forEach((meal) => setMealInCache(meal.idMeal, meal));
        setLoading(false);
      }
    };

    fetchInitialMeals();
  }, [numMeals]); // ✅ Dipendenza rimane `numMeals`

  // Funzione per aggiungere un nuovo pasto
  const addRandomMeal = useCallback(async () => {
    const newMeal = await getRandomMeal();
    setAllMeals((prevMeals) => [...prevMeals, newMeal]);
    setMealInCache(newMeal.idMeal, newMeal);
  }, []);

  useEffect(() => {
    if (allMeals.length < numMeals) {
      addRandomMeal();
    }
  }, [numMeals, allMeals, addRandomMeal]);

  return (
    <div className="min-h-screen bg-black-1">
      <div className="p-4 mx-auto">
        <h2 className="text-2xl font-bold text-center">Ricette Popolari</h2>
        <div className="flex justify-center mt-4">
          <label htmlFor="numMeals" className="mr-2">
            Quante ne vuoi visualizzare?
          </label>
          <input
            id="numMeals"
            type="number"
            min="0"
            max="100"
            value={numMeals}
            onChange={(e) => setNumMeals(Number(e.target.value))}
            className="w-20 p-2 border border-gray-300 rounded"
          />
        </div>

        {loading ? (
          <div className="flex justify-center mt-4">
            <span className="material-icons animate-spin">hourglass_empty</span>{" "}
            {/* Icona di caricamento */}
          </div>
        ) : (
          <div className="grid grid-cols-5 mt-4 gap-7 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {allMeals.slice(0, numMeals).map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">
            Iscriviti alla nostra Newsletter
          </h2>
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
