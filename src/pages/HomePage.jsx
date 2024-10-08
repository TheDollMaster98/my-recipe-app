import React, { useEffect, useState } from "react";
import { getRandomMeal } from "../api/mealApi";
import RecipeCard from "../components/RecipeCard";
import { setMealInCache, getMealFromCache } from "../api/cache"; // Importa le funzioni di caching

const HomePage = () => {
  const [allMeals, setAllMeals] = useState([]);
  const [numMeals, setNumMeals] = useState(25);
  const [loading, setLoading] = useState(true); // Stato di caricamento

  // UseEffect esegue la funzione fetchInitialMeals solo al montaggio del componente
  useEffect(() => {
    const fetchInitialMeals = async () => {
      const cachedMeals = []; // Array per memorizzare i pasti dalla cache

      // Controlla se ci sono pasti nella cache
      for (let i = 0; i < numMeals; i++) {
        const meal = getMealFromCache(i + 1); // Supponendo che gli ID dei pasti siano sequenziali
        if (meal) {
          cachedMeals.push(meal);
        }
      }

      if (cachedMeals.length > 0) {
        setAllMeals(cachedMeals);
        setLoading(false); // Nascondi il loader
      } else {
        const mealPromises = Array.from({ length: numMeals }, () =>
          getRandomMeal()
        );
        const results = await Promise.all(mealPromises);
        setAllMeals(results);
        results.forEach((meal) => setMealInCache(meal.idMeal, meal)); // Memorizza nella cache
        setLoading(false); // Nascondi il loader
      }
    };

    fetchInitialMeals();
  }, [numMeals]);

  useEffect(() => {
    const addRandomMeal = async () => {
      const newMeal = await getRandomMeal();
      setAllMeals((prevMeals) => [...prevMeals, newMeal]);
      setMealInCache(newMeal.idMeal, newMeal); // Memorizza il nuovo pasto nella cache
    };

    if (allMeals.length < numMeals) {
      addRandomMeal();
    }
    console.log("allMeals => ");
    console.log(allMeals);
  }, [numMeals, allMeals.length]); // Esegui quando numMeals cambia

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

        {loading ? ( // Mostra il loader se loading è true
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
