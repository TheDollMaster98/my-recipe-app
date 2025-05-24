import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMealDetailsById } from "../api/mealApi";
import { addRecipeToUser, removeRecipeFromUser, getUserRecipes } from "../api/auth";
import { getReviewsForMeal, addReview } from "../api/storage";
import { getLoggedUser } from "../api/auth";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [ratingDifficolta, setRatingDifficolta] = useState(3);
  const [ratingGusto, setRatingGusto] = useState(3);
  const [commento, setCommento] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Recupero dati...");
    
    const fetchMealDetails = async () => {
      const mealDetails = await getMealDetailsById(id);
      console.log("Ricetta caricata:", mealDetails);
      setMeal(mealDetails);

      // Controlla se la ricetta è già salvata nel ricettario personale
      const userRecipes = getUserRecipes();
      setIsSaved(userRecipes.some((r) => r.idMeal === id));
    };

    setReviews(getReviewsForMeal(id)); // Carica le recensioni salvate
    const loggedUser = getLoggedUser("user");
    console.log("🔹 User recuperato all'avvio:", loggedUser);
    setUser(loggedUser);
    fetchMealDetails();
  }, [id]);

  useEffect(() => {
    const checkUser = () => {
      const loggedUser = getLoggedUser("user");
      console.log("Cambiamento in sessionStorage, nuovo user:", loggedUser);
      setUser(loggedUser);
    };

    window.addEventListener("storage", checkUser);
    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  const handleToggleRecipe = () => {
    if (isSaved) {
      removeRecipeFromUser(meal.idMeal);
      setIsSaved(false);
    } else {
      addRecipeToUser(meal);
      setIsSaved(true);
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    console.log("Tentativo di invio recensione...");
    if (!user) {
      console.error("ERRORE: Nessun utente loggato.");
      alert("Devi essere loggato per lasciare una recensione!");
      return;
    }

    if (!commento.trim()) {
      console.warn("ATTENZIONE: Il commento è vuoto.");
      alert("Inserisci un commento!");
      return;
    }

    addReview(id, user.username, ratingDifficolta, ratingGusto, commento);
    console.log("✅ Recensione salvata!");

    setReviews(getReviewsForMeal(id));
    setCommento("");
  };

  return (
    <div className="w-full h-full p-4 overflow-y-auto bg-white">
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

          <h3 className="mt-8 text-2xl font-bold">Recensioni</h3>
          {reviews.length > 0 ? (
            <div className="mt-4 space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="p-4 bg-white rounded shadow">
                  <div className="flex justify-between">
                    <strong>{review.username}</strong>
                    <span className="text-gray-600">{review.data}</span>
                  </div>
                    <div className="flex items-center gap-6 mt-2">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">Difficoltà:</span>
                        <span>{review.ratingDifficolta}</span>
                        <span className="text-yellow-500 material-icons">star</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">Gusto:</span>
                        <span>{review.ratingGusto}</span>
                        <span className="text-yellow-500 material-icons">star</span>
                      </div>
                    </div>
                  <div className="mt-2">{review.commento}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-gray-600">Nessuna recensione ancora.</p>
          )}

          {user ? (
            <form className="p-4 mt-6 bg-white rounded shadow" onSubmit={handleSubmitReview}>
              <h3 className="text-lg font-semibold">Aggiungi una Recensione</h3>
              <div className="flex items-center justify-start gap-2 mt-2">
                <div className="flex items-center space-x-2">
                  <label>Difficoltà:</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={ratingDifficolta}
                    onChange={(e) => setRatingDifficolta(Number(e.target.value))}
                    className="w-12 p-1 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label>Gusto:</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={ratingGusto}
                    onChange={(e) => setRatingGusto(Number(e.target.value))}
                    className="w-12 p-1 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <textarea
                placeholder="Scrivi la tua recensione..."
                value={commento}
                onChange={(e) => setCommento(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
              <button type="submit" className="w-full p-2 mt-3 text-white bg-blue-500 rounded hover:bg-blue-600">
                Invia Recensione
              </button>
            </form>
          ) : (
            <p className="flex items-center mt-4 text-red-600">
              <span className="mr-2 material-icons">lock</span> Effettua il login per lasciare una recensione.
            </p>
          )}
        </div>
      ) : (
        <p className="text-center">Caricamento...</p>
      )}
    </div>
  );
};

export default RecipeDetailPage;
