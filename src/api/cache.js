const mealCache = {};

export const getMealFromCache = (id) => mealCache[id];

export const setMealInCache = (id, meal) => {
  mealCache[id] = meal;
};
