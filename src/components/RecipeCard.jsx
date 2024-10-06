import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ meal }) => {
  return (
    <Link
      to={`/recipe/${meal.idMeal}`}
      className="block overflow-hidden text-black no-underline bg-white rounded shadow-lg"
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="object-cover w-full h-48"
      />
      <div className="p-4">
        {/* truncate per gestire il testo lungo */}
        <h3 className="text-lg font-bold truncate">{meal.strMeal}</h3>{" "}
        <p className="text-gray-600">Categoria: {meal.strCategory}</p>
      </div>
    </Link>
  );
};

export default RecipeCard;
