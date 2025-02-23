/**
 * Cache:
 * Utilizzata per memorizzare dati che possono essere riutilizzati in diverse sessioni dell'applicazione.
 * I dati rimangono disponibili solo durante l'esecuzione dell'app, ma vengono persi al refresh.
 * È utile per dati che non cambiano frequentemente e che vuoi mantenere per migliorare le prestazioni.
 */

const mealCache = {};

/**
 * Recupera un pasto dalla cache se disponibile.
 * @param {string} id - L'ID del pasto da recuperare.
 * @returns {object|null} - Restituisce i dati del pasto se presenti nella cache, altrimenti `null`.
 */
export const getMealFromCache = (id) => mealCache[id] || null;

/**
 * Salva un pasto nella cache locale.
 * @param {string} id - L'ID del pasto da salvare nella cache.
 * @param {object} meal - L'oggetto contenente i dettagli del pasto.
 */
export const setMealInCache = (id, meal) => {
  mealCache[id] = meal;
};
