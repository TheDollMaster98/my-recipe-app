import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getUserRecipes,
  addRecipeToUser,
  removeRecipeFromUser
} from "../api/auth";

const RecipeCard = ({ meal, onRecipeChange }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Controlla se la ricetta è già nei preferiti
    const userRecipes = getUserRecipes();
    setIsFavorite(userRecipes.some((r) => r.idMeal === meal.idMeal));
  }, [meal.idMeal]);

  const handleToggleFavorite = (e) => {
    e.preventDefault(); // Impedisce la navigazione nel click sul cuore

    if (isFavorite) {
      removeRecipeFromUser(meal.idMeal);
      setIsFavorite(false);
    } else {
      addRecipeToUser(meal);
      setIsFavorite(true);
    }

    onRecipeChange?.(); // Se esiste la callback, viene chiamata
  };

  return (
    <div className="relative block overflow-hidden transition-all transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl">
      {/* Immagine cliccabile */}
      <Link to={`/recipe/${meal.idMeal}`} className="block no-underline">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="object-cover w-full h-48 rounded-t-lg"
        />
      </Link>

      <div className="p-4 text-center">
        <h3 className="text-lg font-bold truncate">{meal.strMeal}</h3>
        <p className="text-gray-600">Categoria: {meal.strCategory}</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          {/* Bottone info */}
          <Link
            to={`/recipe/${meal.idMeal}`}
            className="flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full hover:bg-blue-600"
            title="Dettagli Ricetta"
          >
            {/* non so perché l'icona info della material abbia quel tratino */}
            <span className="text-base align-middle material-icons">info</span>
          </Link>

          {/* Bottone dei like */}
          <button
            onClick={handleToggleFavorite}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
              isFavorite
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-500"
            }`}
            title="Aggiungi ai preferiti"
          >
            <span className="text-base align-middle material-icons">favorite</span>
          </button>
      </div>

      </div>
    </div>
  );
};

export default RecipeCard;
