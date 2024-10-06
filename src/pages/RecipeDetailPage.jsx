import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMealDetailsById } from '../api/mealApi';

const RecipeDetailPage = () => {
  const { id } = useParams(); // Ottieni l'ID della ricetta dai parametri URL
  const navigate = useNavigate(); // Hook per la navigazione
  const [meal, setMeal] = useState(null);

  const fetchMealDetails = async () => {
    const mealDetails = await getMealDetailsById(id);
    setMeal(mealDetails);
  };

  useEffect(() => {
    fetchMealDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // Torna indietro
    fetchMealDetails(); // Ricarica i dettagli della ricetta
  };

  if (!meal) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="min-h-screen p-4 bg-white-1">
      <div
        onClick={handleGoBack}
        className="flex items-center p-2 mb-4 text-black cursor-pointer"
      >
        <span className="mt-1 material-icons">arrow_back</span>
        <span className="ml-2 font-bold">Torna Indietro</span>
      </div>
      <div className="p-8 bg-white rounded shadow-lg">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal} 
          className="object-cover w-full mb-4 rounded h-96" 
        />
        <h2 className="mt-6 text-3xl font-bold text-center">{meal.strMeal}</h2>
        <p className="mt-2 text-lg text-center text-gray-600">Categoria: {meal.strCategory}</p>
        <h3 className="mt-6 text-2xl font-bold">Procedura</h3>
        <p className="mt-4 text-base">{meal.strInstructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
