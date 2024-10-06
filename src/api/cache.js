/**
Cache:
Utilizzata per memorizzare dati che possono essere riutilizzati in diverse sessioni dell'applicazione.
I dati rimangono disponibili anche dopo che l'utente ha chiuso il browser.
È utile per dati che non cambiano frequentemente e che vuoi mantenere per un lungo periodo.
 */

const mealCache = {};

export const getMealFromCache = (id) => mealCache[id];

export const setMealInCache = (id, meal) => {
  mealCache[id] = meal;
};
