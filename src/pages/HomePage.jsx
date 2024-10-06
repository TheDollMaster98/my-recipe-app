import React, { useEffect, useState } from "react";
import { getRandomMeal } from "../api/mealApi";
import RecipeCard from "../components/RecipeCard";
import { setSessionData, getSessionData } from "../api/session"; // Importa le funzioni

const HomePage = () => {
  const [allMeals, setAllMeals] = useState([]);
  const [numMeals, setNumMeals] = useState(25);

  // UseEffect esegue la funzione fetchInitialMeals solo al montaggio del componente
  useEffect(() => {
    const fetchInitialMeals = async () => {
      const cachedMeals = getSessionData("allMeals");

      if (cachedMeals) {
        setAllMeals(cachedMeals);
      } else {
        const mealPromises = Array.from({ length: numMeals }, () =>
          getRandomMeal()
        );
        const results = await Promise.all(mealPromises);
        setAllMeals(results);
        setSessionData("allMeals", results); // Usa la funzione per memorizzare i dati
      }
    };

    fetchInitialMeals();
  }, []); //

  useEffect(() => {
    const addRandomMeal = async () => {
      const newMeal = await getRandomMeal();
      setAllMeals((prevMeals) => [...prevMeals, newMeal]);
    };

    if (allMeals.length < numMeals) {
      addRandomMeal();
    }
  }, [numMeals, allMeals.length]); // Esegui quando numMeals cambia

  return (
    <div className="min-h-screen bg-black-1">
      <div className="p-4 mx-auto mt-8 ">
        <h2 className="text-2xl font-bold text-center">Ricette Popolari</h2>
        <div className="flex justify-center mt-4">
          <label htmlFor="numMeals" className="mr-2">
            Numero di ricette da mostrare:
          </label>
          <input
            id="numMeals"
            type="number"
            min="0"
            value={numMeals}
            onChange={(e) => setNumMeals(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="grid grid-cols-5 mt-4 gap-7 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {" "}
          {allMeals.slice(0, numMeals).map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
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
