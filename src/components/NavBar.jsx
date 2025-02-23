import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import { getSessionData } from "../api/auth"; // Ottiene i dati della sessione

const NavBar = () => {
  const user = getSessionData("user"); // Controlla se l'utente è loggato

  return (
    <div className="sticky top-0 left-0 z-50 w-full bg-bg-black-1">
      <nav className="p-4">
        <div className="flex items-center justify-between">
          {/* 🔹 Logo + Nome */}
          <Link to="/" className="flex items-center text-white no-underline">
            <h1 className="mr-2 text-2xl font-bold text-white">PGRC</h1>
            <img src={logo} alt="logo" className="w-10 h-10" />
            {user && <h4 className="ml-1">Ciao {user.username}!</h4>}
          </Link>

          {/* 🔹 Menu di navigazione */}
          <div className="flex ml-auto space-x-3">
            <Link to="/" className="flex items-center text-white no-underline">
              <span className="align-middle material-icons">home</span>
            </Link>
            <Link to="/recipe" className="flex items-center text-white no-underline">
              <span className="align-middle material-icons">menu_book</span>
            </Link>
            <Link to="/debug" className="flex items-center text-white no-underline">
              <span className="align-middle material-icons">bug_report</span>
            </Link>

            {/* 🔹 Login/Profilo */}
            {user ? (
              <Link to="/profile" className="flex items-center text-white no-underline">
                <span className="align-middle material-icons">person</span>
              </Link>
            ) : (
              <Link to="/login" className="flex items-center text-white no-underline">
                <span className="align-middle material-icons">login</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
