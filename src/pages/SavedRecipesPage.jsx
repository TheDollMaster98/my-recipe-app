import React, { useState, useEffect } from "react";
import { getUserRecipes } from "../api/auth";
import RecipeCard from "../components/RecipeCard";

const SavedRecipesPage = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [refresh, setRefresh] = useState(false); // Trigger per aggiornare la UI

  useEffect(() => {
    setSavedRecipes(getUserRecipes()); // Aggiorna quando cambia refresh
  }, [refresh]);

  const handleRecipeChange = () => {
    setRefresh((prev) => !prev); // Cambia lo stato per forzare il re-render
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="mb-6 text-3xl font-bold text-center text-black">
        <div className="flex items-center justify-center gap-2">
          Il Mio Ricettario
          <span className="text-blue-500 material-icons" style={{ fontSize: "2.5rem" }}>
            menu_book
          </span>
        </div>
      </h2>
      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {savedRecipes.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} onRecipeChange={handleRecipeChange} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-center text-gray-600">Non hai ancora salvato nessuna ricetta!</p>
      )}
    </div>
  );
};

export default SavedRecipesPage;
