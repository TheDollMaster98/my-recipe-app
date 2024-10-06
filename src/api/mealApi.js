const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Funzione per cercare un pasto per nome
export const searchMealByName = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Errore nella ricerca del pasto:", error);
  }
};

// Funzione per ottenere i dettagli di un pasto tramite ID
export const getMealDetailsById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error("Errore nel recupero dei dettagli del pasto:", error);
  }
};

// Funzione per ottenere un pasto casuale
export const getRandomMeal = async () => {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error("Errore nel recupero del pasto casuale:", error);
  }
};

// Funzione per filtrare i pasti per ingrediente principale
export const filterMealsByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Errore nel filtraggio dei pasti per ingrediente:", error);
  }
};

// Funzione per ottenere tutte le categorie
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories.php`);
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error("Errore nel recupero delle categorie:", error);
  }
};

// Funzione per ottenere pasti da una categoria specifica
export const getMealsByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Errore nel recupero dei pasti per categoria:", error);
  }
};
