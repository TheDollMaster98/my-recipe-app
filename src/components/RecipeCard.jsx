import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserRecipes, addRecipeToUser, removeRecipeFromUser } from "../api/session";

const RecipeCard = ({ meal }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Controlla se la ricetta è già nei preferiti
    const userRecipes = getUserRecipes();
    setIsFavorite(userRecipes.some((r) => r.idMeal === meal.idMeal));
  }, [meal.idMeal]);

  const handleToggleFavorite = (e) => {
    e.preventDefault(); // Evita la navigazione quando si clicca sul cuore

    if (isFavorite) {
      removeRecipeFromUser(meal.idMeal);
    } else {
      addRecipeToUser(meal);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <div className="relative block overflow-hidden transition-all transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl">
      {/* Click sulla foto per vedere la ricetta */}
      <Link to={`/recipe/${meal.idMeal}`} className="block no-underline">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="object-cover w-full h-48 rounded-t-lg" />
      </Link>

      <div className="p-4 text-center">
        <h3 className="text-lg font-bold truncate">{meal.strMeal}</h3>
        <p className="text-gray-600">Categoria: {meal.strCategory}</p>

        {/* Pulsante Cuore */}
        <button
          onClick={handleToggleFavorite}
          className="flex items-center justify-center w-full mt-3 transition-all transform hover:scale-110"
        >
          <span
            className={`material-icons text-4xl transition-colors duration-300 ${
              isFavorite ? "text-red-500" : "text-gray-300 hover:text-gray-500"
            }`}
          >
            favorite
          </span>
        </button>

        {/* Pulsante per vedere la ricetta */}
        <Link
          to={`/recipe/${meal.idMeal}`}
          className="block w-full px-4 py-2 mt-4 font-semibold text-white no-underline transition-all bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Vedi Ricetta
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
