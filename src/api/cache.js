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
