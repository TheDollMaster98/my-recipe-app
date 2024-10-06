import React from 'react';
import { Link } from 'react-router-dom';
import 'material-icons/iconfont/material-icons.css';

const NavBar = () => {
  return (
    <div className="sticky top-0 left-0 z-50 w-full bg-bg-black-1">
      <nav className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-white">PGRC</h1>
          <div className="flex ml-auto space-x-2">
            <Link to="/" className="flex items-center pl-3 text-white no-underline">
              <span className="align-middle material-icons">home</span>
            </Link>
            <Link to="/recipe" className="flex items-center pl-3 text-white no-underline">
              <span className="align-middle material-icons">restaurant_menu</span>
            </Link>
            <Link to="/search" className="flex items-center pl-3 text-white no-underline">
              <span className="align-middle material-icons">search</span>
            </Link>
            <Link to="/profile" className="flex items-center pl-3 text-white no-underline">
              <span className="align-middle material-icons">account_circle</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;