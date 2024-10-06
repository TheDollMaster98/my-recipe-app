import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ meal }) => {
  return (
    <Link to={`/recipe/${meal.idMeal}`} className="block text-black no-underline">
      <div className="max-w-xs p-4 bg-white rounded shadow">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="object-cover w-full h-24 rounded" />
        <div className="flex justify-between mt-2">
          <h3 className="text-sm font-bold">{meal.strMeal}</h3>
        </div>
        <p className="text-xs text-gray-600">Categoria: {meal.strCategory}</p>
      </div>
    </Link>
  );
};

export default RecipeCard;
