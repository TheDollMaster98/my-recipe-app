import { getMealFromCache, setMealInCache } from "./cache";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

/**
 * Cerca un pasto per nome utilizzando l'API di TheMealDB.
 * @param {string} name - Il nome del pasto da cercare.
 * @returns {Array|null} - Restituisce un array di pasti corrispondenti o `null` in caso di errore.
 */
export const searchMealByName = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Errore nella ricerca del pasto:", error);
    return null;
  }
};

/**
 * Ottiene i dettagli di un pasto tramite ID, prima controllando la cache.
 * @param {string} id - L'ID del pasto da recuperare.
 * @returns {object|null} - Restituisce i dettagli del pasto o `null` in caso di errore.
 */
export const getMealDetailsById = async (id) => {
  const cachedMeal = getMealFromCache(id);
  if (cachedMeal) {
    return cachedMeal;
  }

  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    const mealDetails = data.meals ? data.meals[0] : null;

    if (mealDetails) {
      setMealInCache(id, mealDetails); // Salva nella cache per uso futuro
    }

    return mealDetails;
  } catch (error) {
    console.error("Errore nel recupero dei dettagli del pasto:", error);
    return null;
  }
};

/**
 * Ottiene un pasto casuale dall'API.
 * @returns {object|null} - Restituisce i dettagli di un pasto casuale o `null` in caso di errore.
 */
export const getRandomMeal = async () => {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Errore nel recupero del pasto casuale:", error);
    return null;
  }
};

/**
 * Filtra i pasti per ingrediente principale.
 * @param {string} ingredient - Il nome dell'ingrediente da filtrare.
 * @returns {Array|null} - Restituisce un array di pasti filtrati o `null` in caso di errore.
 */
export const filterMealsByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Errore nel filtraggio dei pasti per ingrediente:", error);
    return null;
  }
};

/**
 * Recupera tutte le categorie di pasti disponibili.
 * @returns {Array|null} - Restituisce un array di categorie o `null` in caso di errore.
 */
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories.php`);
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error("Errore nel recupero delle categorie:", error);
    return null;
  }
};

/**
 * Ottiene tutti i pasti appartenenti a una specifica categoria.
 * @param {string} category - Il nome della categoria da filtrare.
 * @returns {Array|null} - Restituisce un array di pasti della categoria o `null` in caso di errore.
 */
export const getMealsByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Errore nel recupero dei pasti per categoria:", error);
    return null;
  }
};

/**
 * Ottiene tutti i pasti appartenenti a una specifica area geografica.
 * @param {string} area - Il nome dell'area geografica (es. "Italian").
 * @returns {Array|null} - Restituisce un array di pasti dell'area o `null` in caso di errore.
 */
export const getMealsByArea = async (area) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?a=${area}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Errore nel recupero dei pasti per area:", error);
    return null;
  }
};
