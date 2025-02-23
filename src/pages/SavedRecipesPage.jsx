import React, { useState, useEffect } from "react";
import { getUserRecipes } from "../api/session";
import RecipeCard from "../components/RecipeCard";

const SavedRecipesPage = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    setSavedRecipes(getUserRecipes()); // Carica le ricette salvate all'avvio
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="mb-6 text-3xl font-bold text-center text-black">Il Mio Ricettario 📖</h2>

      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {savedRecipes.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-center text-gray-600">Non hai ancora salvato nessuna ricetta!</p>
      )}
    </div>
  );
};

export default SavedRecipesPage;
