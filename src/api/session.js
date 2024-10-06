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
