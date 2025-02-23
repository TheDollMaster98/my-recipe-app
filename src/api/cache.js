/**
 * Cache:
 * Utilizzata per memorizzare dati che possono essere riutilizzati in diverse sessioni dell'applicazione.
 * I dati rimangono disponibili solo durante l'esecuzione dell'app, ma vengono persi al refresh.
 * Ora utilizziamo `sessionStorage` per mantenere le ricette anche dopo il cambio di pagina.
 */

const mealCache = {};

/**
 * Recupera un pasto dalla cache se disponibile.
 * @param {string} id - L'ID del pasto da recuperare.
 * @returns {object|null} - Restituisce i dati del pasto se presenti nella cache, altrimenti `null`.
 */
export const getMealFromCache = (id) => {
  if (mealCache[id]) return mealCache[id]; // Controlla la cache in memoria

  const storedMeal = sessionStorage.getItem(`meal_${id}`);
  return storedMeal ? JSON.parse(storedMeal) : null; // Controlla sessionStorage
};

/**
 * Salva un pasto nella cache locale e in sessionStorage.
 * @param {string} id - L'ID del pasto da salvare nella cache.
 * @param {object} meal - L'oggetto contenente i dettagli del pasto.
 */
export const setMealInCache = (id, meal) => {
  mealCache[id] = meal; // Salva in memoria
  sessionStorage.setItem(`meal_${id}`, JSON.stringify(meal)); // Salva in sessionStorage
};

/**
 * Recupera tutte le ricette dalla cache.
 * @returns {Array} - Restituisce un array con tutte le ricette salvate nella sessione.
 */
export const getAllMealsFromCache = () => {
  return Object.values(mealCache).length > 0
    ? Object.values(mealCache)
    : Object.keys(sessionStorage)
        .filter((key) => key.startsWith("meal_"))
        .map((key) => JSON.parse(sessionStorage.getItem(key)));
};
