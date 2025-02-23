import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMealDetailsById } from "../api/mealApi";
import { addRecipeToUser, removeRecipeFromUser, getUserRecipes } from "../api/session";

const RecipeDetailPage = () => {
  const { id } = useParams(); // Ottiene l'ID della ricetta dai parametri URL
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchMealDetails = async () => {
      const mealDetails = await getMealDetailsById(id);
      setMeal(mealDetails);

      // Controlla se la ricetta è già salvata nel ricettario personale
      const userRecipes = getUserRecipes();
      setIsSaved(userRecipes.some((r) => r.idMeal === id));
    };

    fetchMealDetails();
  }, [id]);

  const handleToggleRecipe = () => {
    if (isSaved) {
      removeRecipeFromUser(meal.idMeal);
      setIsSaved(false);
    } else {
      addRecipeToUser(meal);
      setIsSaved(true);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-white">
      {meal ? (
        <div className="p-8 bg-white rounded shadow-lg">
          {/* Bottone Torna Indietro */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 mb-4 text-white transition-all bg-gray-500 rounded-lg hover:bg-gray-600"
          >
            <span className="mr-2 material-icons">arrow_back</span> Torna Indietro
          </button>

          <img src={meal.strMealThumb} alt={meal.strMeal} className="object-cover w-full mb-4 rounded h-96" />
          <h2 className="mt-6 text-3xl font-bold">{meal.strMeal}</h2>
          <p className="mt-2 text-lg text-gray-600">Categoria: {meal.strCategory}</p>

          {/* Bottone per aggiungere o rimuovere la ricetta */}
          <button
            onClick={handleToggleRecipe}
            className={`w-full p-3 mt-4 rounded-lg ${
              isSaved ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            } text-white transition-all`}
          >
            {isSaved ? "Rimuovi dal Ricettario" : "Aggiungi al Ricettario"}
          </button>

          <h3 className="mt-6 text-2xl font-bold">Procedura</h3>
          <p className="mt-4 text-base">{meal.strInstructions}</p>
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default RecipeDetailPage;
