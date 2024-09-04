import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div class="bg-black-1">
      <nav className="p-4 bg-gray-800">
        <div className="container flex items-center justify-between">
          <h1 className="text-2xl text-white">PGRC</h1>
          <div>
            <Link to="/" className="px-4 text-white">Home</Link>
            {/* <Link to="/profile" className="px-4 text-white">Profilo</Link>
            <Link to="/recipe" className="px-4 text-white">Ricette</Link> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
