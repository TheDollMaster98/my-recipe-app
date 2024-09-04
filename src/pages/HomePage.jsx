import React from 'react';
import NavBar from '../components/NavBar';
const HomePage = () => {
  return (
    <div class="bg-black-1">
      <NavBar />
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold">Benvenuto nella PGRC!</h2>
        <p className="mt-4">Gestisci il tuo ricettario personale e scopri nuove ricette.</p>
        <input type="text" placeholder="Cerca una ricetta..." className="p-2 mt-4 border border-gray-300 rounded" />
        <button className="p-2 ml-2 text-white bg-blue-500 rounded">Cerca</button>
      </div>
    </div>
  );
};

export default HomePage;
