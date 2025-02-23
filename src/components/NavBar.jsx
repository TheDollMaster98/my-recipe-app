import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import { getLoggedUser } from "../api/auth";

const NavBar = () => {
  const [user, setUser] = useState(getLoggedUser()); 

  useEffect(() => {
    const updateUser = () => {
      const loggedUser = getLoggedUser();
      console.log("Navbar aggiornata, nuovo user:", loggedUser);
      setUser(loggedUser);
    };
    
    // Rileva cambiamenti in localStorage
    window.addEventListener("storage", updateUser); 

    return () => {
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  return (
    <div className="sticky top-0 left-0 z-50 w-full bg-bg-black-1">
      <nav className="p-4">
        <div className="flex items-center justify-between">
          {/* Logo + Nome */}
          <Link to="/" className="flex items-center text-white no-underline">
            <h1 className="mr-2 text-2xl font-bold text-white">PGRC</h1>
            <img src={logo} alt="logo" className="w-10 h-10" />
            {user && <h4 className="ml-1">Ciao {user.username}!</h4>}
          </Link>

          {/* Menu di navigazione */}
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
