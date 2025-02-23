/**
 * Cache:
 * Mantiene i dati anche dopo il refresh usando `localStorage`,
 * così le ricette non vengono perse e non serve rifare il fetch ad ogni avvio.
 */

const mealCache = {};

/**
 * Recupera un pasto dalla cache o da `localStorage`.
 * @param {string} id - L'ID del pasto da recuperare.
 * @returns {object|null} - Restituisce i dati del pasto se presenti nella cache o `localStorage`, altrimenti `null`.
 */
export const getMealFromCache = (id) => {
  if (mealCache[id]) return mealCache[id]; // Controlla la cache in memoria

  const storedMeal = localStorage.getItem(`meal_${id}`); // Usa localStorage invece di sessionStorage
  return storedMeal ? JSON.parse(storedMeal) : null;
};

/**
 * Salva un pasto nella cache locale e in `localStorage`.
 * @param {string} id - L'ID del pasto da salvare nella cache.
 * @param {object} meal - L'oggetto contenente i dettagli del pasto.
 */
export const setMealInCache = (id, meal) => {
  mealCache[id] = meal; // Salva in memoria
  localStorage.setItem(`meal_${id}`, JSON.stringify(meal)); // Usa localStorage per mantenere i dati
};

/**
 * Recupera tutte le ricette dalla cache.
 * @returns {Array} - Restituisce un array con tutte le ricette salvate nella sessione.
 */
export const getAllMealsFromCache = () => {
  return Object.values(mealCache).length > 0
    ? Object.values(mealCache)
    : Object.keys(localStorage) // Cambiato da `sessionStorage` a `localStorage`
        .filter((key) => key.startsWith("meal_"))
        .map((key) => JSON.parse(localStorage.getItem(key)));
};

/**
 * Ottiene tutte le recensioni per una determinata ricetta
 * @param {string} idMeal - L'ID della ricetta
 * @returns {Array} - Un array di recensioni
 */
export const getReviewsForMeal = (idMeal) => {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  return reviews.filter((review) => review.idMeal === idMeal);
};

/**
 * Aggiunge una nuova recensione per una ricetta
 * @param {string} idMeal - L'ID della ricetta recensita
 * @param {string} username - Il nome dell'utente che recensisce
 * @param {number} ratingDifficolta - Voto di difficoltà (1-5)
 * @param {number} ratingGusto - Voto di gusto (1-5)
 * @param {string} commento - Testo della recensione
 */
export const addReview = (
  idMeal,
  username,
  ratingDifficolta,
  ratingGusto,
  commento
) => {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const newReview = {
    idMeal,
    username,
    ratingDifficolta,
    ratingGusto,
    commento,
    data: new Date().toLocaleDateString(),
  };

  reviews.push(newReview);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  console.log("Recensione aggiunta:", newReview);
  console.log(
    "Tutte le recensioni salvate:",
    JSON.parse(localStorage.getItem("reviews"))
  );
};
