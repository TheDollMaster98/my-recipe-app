import React, { useEffect, useState, useCallback } from "react";
import { getRandomMeal, searchMealByName } from "../api/mealApi";
import RecipeCard from "../components/RecipeCard";
import { setMealInCache, getAllMealsFromCache } from "../api/storage";

const HomePage = () => {
  const [allMeals, setAllMeals] = useState([]); // Tutte le ricette originali
  const [filteredMeals, setFilteredMeals] = useState([]); // Ricette filtrate dalla ricerca
  const [numMeals, setNumMeals] = useState(25);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Stato per il valore della ricerca

  useEffect(() => {
    const fetchInitialMeals = async () => {
      const cachedMeals = getAllMealsFromCache();
      if (cachedMeals.length > 0) {
        setAllMeals(cachedMeals);
        setFilteredMeals(cachedMeals);
        setLoading(false);
      } else {
        const mealPromises = Array.from({ length: numMeals }, () => getRandomMeal());
        const results = await Promise.all(mealPromises);
        setAllMeals(results);
        setFilteredMeals(results);
        results.forEach((meal) => setMealInCache(meal.idMeal, meal));
        setLoading(false);
      }
    };

    fetchInitialMeals();
  }, [numMeals]);

  // Funzione per aggiungere nuovi pasti se richiesto
  const addRandomMeal = useCallback(async () => {
    const newMeal = await getRandomMeal();
    setAllMeals((prevMeals) => [...prevMeals, newMeal]);
    setFilteredMeals((prevMeals) => [...prevMeals, newMeal]); // Aggiorna anche i risultati visibili
    setMealInCache(newMeal.idMeal, newMeal);
  }, []);

  useEffect(() => {
    if (allMeals.length < numMeals) {
      addRandomMeal();
    }
  }, [numMeals, allMeals, addRandomMeal]);

  // Funzione di ricerca
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (!query.trim()) {
      // Se il campo è vuoto, ripristina le ricette originali
      setFilteredMeals(allMeals);
      return;
    }

    setLoading(true);
    const results = await searchMealByName(query);
    setFilteredMeals(results || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4 mx-auto bg-black-1">
      {/* Barra di ricerca con icona */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Cerca una ricetta..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 pl-10 border border-gray-300 rounded w-80 focus:outline-none"
          />
          <span className="absolute text-gray-500 left-3 material-icons">search</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center">
        {searchTerm ? "Risultati della ricerca" : "Ricette Popolari"}
      </h2>

      {/* Numero di ricette visualizzate (solo se non si sta cercando) */}
      {!searchTerm && (
        <div className="flex justify-center mt-4">
          <label htmlFor="numMeals" className="flex items-center mr-2">
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
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center mt-4">
          <span className="material-icons animate-spin">hourglass_empty</span>
        </div>
      ) : (
        <div className="grid grid-cols-5 mt-4 gap-7 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {filteredMeals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}

      {/* Sezione newsletter (solo se non si sta cercando) */}
      {!searchTerm && (
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
      )}
    </div>
  );
};

export default HomePage;
