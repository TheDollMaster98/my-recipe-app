import React, { useEffect, useState, useCallback } from "react";
import { getRandomMeal, searchMealByName, getAllCategories } from "../api/mealApi";
import RecipeCard from "../components/RecipeCard";
import { setMealInCache, getAllMealsFromCache } from "../api/storage";

const HomePage = () => {
  const [allMeals, setAllMeals] = useState([]); // Tutte le ricette originali
  const [filteredMeals, setFilteredMeals] = useState([]); // Ricette filtrate dalla ricerca
  const [numMeals, setNumMeals] = useState(25);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Stato per il valore della ricerca
  const [categories, setCategories] = useState([]); // Tutte le categorie
  const [selectedCategories, setSelectedCategories] = useState([]); // Categorie filtrate

  // Recupera le categorie disponibili
  useEffect(() => {
    const fetchCategories = async () => {
      const categoryList = await getAllCategories();
      if (categoryList) {
        setCategories(categoryList.map((c) => c.strCategory)); // Usa solo i nomi delle categorie
      }
    };
    fetchCategories();
  }, []);

  // Funzione per caricare le ricette iniziali
  const fetchInitialMeals = useCallback(async () => {
    const cachedMeals = getAllMealsFromCache();
    if (cachedMeals.length >= numMeals) {
      setAllMeals(cachedMeals);
      setFilteredMeals(cachedMeals);
      setLoading(false);
      return;
    }

    const mealPromises = Array.from({ length: numMeals }, () => getRandomMeal());
    const results = await Promise.all(mealPromises);
    setAllMeals(results);
    setFilteredMeals(results);
    results.forEach((meal) => setMealInCache(meal.idMeal, meal));
    setLoading(false);
  }, [numMeals]);

  useEffect(() => {
    fetchInitialMeals();
  }, [fetchInitialMeals]);

  // Funzione di ricerca
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (!query.trim()) {
      setFilteredMeals(allMeals);
      return;
    }

    setLoading(true);
    const results = await searchMealByName(query);
    setFilteredMeals(results || []);
    setLoading(false);
  };

  // Gestisce il cambio di selezione delle categorie
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Filtra i pasti in base alle categorie selezionate
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredMeals(allMeals);
    } else {
      setFilteredMeals(allMeals.filter((meal) => selectedCategories.includes(meal.strCategory)));
    }
  }, [selectedCategories, allMeals]);

  return (
    <div className="min-h-screen p-4 mx-auto bg-gray-100">
      {/* Barra di ricerca con icona */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Cerca una ricetta..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 pl-10 border border-gray-300 rounded w-80 focus:outline-none"
          />
          <span className="absolute text-gray-500 left-3 material-icons">search</span>
        </div>
      </div>

      {/* Selezione delle categorie con checkbox */}
      <h3 className="mt-4 text-lg font-semibold text-center">Filtra per Categoria</h3>
      <div className="grid grid-cols-2 gap-4 my-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
        {categories.map((category) => (
          <label key={category} className="flex items-center px-3 py-1 space-x-2 bg-white rounded-lg shadow-md">
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="w-5 h-5"
            />
            <span className="font-semibold text-black">{category}</span>
          </label>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-center">
        {searchTerm ? "Risultati della ricerca" : "Ricette Popolari"}
      </h2>

      {/* Numero di ricette visualizzate (solo se non si sta cercando) */}
      {!searchTerm && (
        <div className="flex justify-center mt-4">
          <label htmlFor="numMeals" className="flex items-center mr-2">
            Quante ne vuoi visualizzare?
          </label>
          <input
            id="numMeals"
            type="number"
            min="0"
            max="100"
            value={numMeals}
            onChange={(e) => setNumMeals(Number(e.target.value))}
            className="w-20 p-2 border border-gray-300 rounded"
          />
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center mt-4">
          <span className="material-icons animate-spin">hourglass_empty</span>
        </div>
      ) : (
        <div className="grid grid-cols-5 mt-4 gap-7 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {filteredMeals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
