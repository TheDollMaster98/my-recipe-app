/**
 * Sessione:
 * Utilizzata per memorizzare dati solo per la durata della sessione dell'utente.
 * I dati vengono rimossi quando l'utente chiude il browser o la scheda.
 * È utile per dati temporanei che non devono persistere oltre la sessione attuale.
 */

// SESSION STORAGE:

// Funzione per memorizzare i dati in sessionStorage
export const setSessionData = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

// Funzione per recuperare i dati da sessionStorage
export const getSessionData = (key) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Funzione per rimuovere i dati da sessionStorage
export const removeSessionData = (key) => {
  sessionStorage.removeItem(key);
};

// LOCAL STORAGE:

// Funzione per memorizzare i dati in localStorage
export const setLocalData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Funzione per recuperare i dati da localStorage
export const getLocalData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Funzione per rimuovere i dati da localStorage
export const removeLocalData = (key) => {
  localStorage.removeItem(key);
};

// REGISTRAZIONE & LOGIN:

/**
 * Registra un nuovo utente e lo salva in localStorage.
 * @param {string} email - L'email dell'utente
 * @param {string} password - La password dell'utente
 * @param {string} username - Il nickname dell'utente
 * @returns {object} - Oggetto con `success` (true/false) e `message`
 */
export const registerUser = (email, password, username) => {
  let users = getLocalData("users") || [];
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return { success: false, message: "Email già registrata!" };
  }

  const newUser = { email, password, username };
  users.push(newUser);
  setLocalData("users", users); // Salva in localStorage
  return { success: true, message: "Registrazione completata!" };
};

/**
 * Effettua il login di un utente verificando email e password.
 * @param {string} email - L'email dell'utente
 * @param {string} password - La password dell'utente
 * @returns {object} - Oggetto con `success` (true/false) e `user` se il login è valido
 */
export const loginUser = (email, password) => {
  const users = getLocalData("users") || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    setLocalData("loggedUser", user); // Salva lo stato di login in localStorage
    return { success: true, user };
  }
  return { success: false, message: "Credenziali errate!" };
};

/**
 * Verifica se un utente è attualmente loggato.
 * @returns {boolean} - Restituisce `true` se un utente è loggato, `false` altrimenti.
 */
export const isUserLoggedIn = () => {
  return getLocalData("loggedUser") !== null;
};

/**
 * Effettua il logout dell'utente rimuovendo i dati da localStorage.
 */
export const logoutUser = () => {
  removeLocalData("loggedUser");
};

/**
 * Ottiene i dati dell'utente attualmente loggato.
 * @returns {object|null} - Oggetto con i dati dell'utente o `null` se nessun utente è loggato.
 */
export const getLoggedUser = () => {
  return getLocalData("loggedUser");
};

/**
 * Aggiorna il nickname dell'utente loggato.
 * @param {string} newUsername - Il nuovo nickname dell'utente
 * @returns {object} - Oggetto con `success` (true/false) e `message`
 */
export const updateUserProfile = (newUsername) => {
  let user = getLoggedUser();
  if (user) {
    user.username = newUsername;
    setLocalData("loggedUser", user); // Aggiorna localStorage con il nuovo nome utente

    // Aggiorna anche nell'array degli utenti registrati
    let users = getLocalData("users") || [];
    users = users.map((u) => (u.email === user.email ? user : u));
    setLocalData("users", users);

    return { success: true, message: "Nickname aggiornato!" };
  }
  return { success: false, message: "Nessun utente loggato." };
};

/**
 * Funzione per recuperare il ricettario personale dell'utente loggato.
 * @returns {Array} - Restituisce un array di ricette salvate, oppure un array vuoto se non ci sono ricette.
 */
export const getUserRecipes = () => {
  const user = getLoggedUser();
  if (!user) return [];
  return getLocalData(`recipes_${user.email}`) || [];
};

/**
 * Aggiunge una ricetta al ricettario personale dell'utente.
 * @param {object} meal - L'oggetto contenente i dettagli della ricetta.
 * @returns {object} - Oggetto con `success` (true/false) e `message`.
 */
export const addRecipeToUser = (meal) => {
  const user = getLoggedUser();
  if (!user)
    return {
      success: false,
      message: "Devi essere loggato per aggiungere una ricetta!",
    };

  let userRecipes = getUserRecipes();
  if (userRecipes.some((r) => r.idMeal === meal.idMeal)) {
    return {
      success: false,
      message: "Questa ricetta è già nel tuo ricettario!",
    };
  }

  userRecipes.push(meal);
  setLocalData(`recipes_${user.email}`, userRecipes);
  return { success: true, message: "Ricetta aggiunta con successo!" };
};

/**
 * Rimuove una ricetta dal ricettario personale dell'utente.
 * @param {string} mealId - L'ID della ricetta da rimuovere.
 * @returns {object} - Oggetto con `success` (true/false) e `message`.
 */
export const removeRecipeFromUser = (mealId) => {
  const user = getLoggedUser();
  if (!user)
    return {
      success: false,
      message: "Devi essere loggato per rimuovere una ricetta!",
    };

  let userRecipes = getUserRecipes();
  const updatedRecipes = userRecipes.filter((r) => r.idMeal !== mealId);

  if (userRecipes.length === updatedRecipes.length) {
    return {
      success: false,
      message: "La ricetta non è presente nel tuo ricettario!",
    };
  }

  setLocalData(`recipes_${user.email}`, updatedRecipes);
  return { success: true, message: "Ricetta rimossa con successo!" };
};
