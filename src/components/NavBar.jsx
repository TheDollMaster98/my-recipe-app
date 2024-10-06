import React from "react";
import { Link } from "react-router-dom";
import "material-icons/iconfont/material-icons.css";
import logo from "../assets/logo.webp";
import { getSessionData } from "../api/session"; // Importa la funzione per ottenere i dati della sessione

const NavBar = () => {
  const user = getSessionData("user"); // Controlla se l'utente è loggato

  return (
    <div className="sticky top-0 left-0 z-50 w-full bg-bg-black-1">
      <nav className="p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center text-white no-underline">
            <h1 className="mr-2 text-2xl text-white">PGRC</h1>
            <img src={logo} alt="logo" className="w-10 h-10" />
            {user && <h4 className="ml-1">Ciao {user.username}!</h4>}{" "}
          </Link>

          <div className="flex ml-auto space-x-2">
            <Link
              to="/"
              className="flex items-center pl-3 text-white no-underline"
            >
              <span className="align-middle material-icons">home</span>
            </Link>
            <Link
              to="/recipe"
              className="flex items-center pl-3 text-white no-underline"
            >
              <span className="align-middle material-icons">
                restaurant_menu
              </span>
            </Link>
            <Link
              to="/search"
              className="flex items-center pl-3 text-white no-underline"
            >
              <span className="align-middle material-icons">search</span>
            </Link>

            {user ? (
              <Link to="/profile" className="text-white">
                <span className="align-middle material-icons">
                  account_circle
                </span>
              </Link>
            ) : (
              <Link to="/login" className="text-white">
                <span className="align-middle material-icons">
                  account_circle
                </span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
