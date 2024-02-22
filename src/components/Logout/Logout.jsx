import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./auth";
import { FaSignOutAlt } from "react-icons/fa"; // Cambio de importación
import Style from "./Logout.module.css";

export default function Logout() {
  const handleLogout = () => {
    localStorage.removeItem("username");
  };
  return (
    isAuthenticated() && (
      <Link to="/acceso">
        <button
          className={`btn btn-danger btn-lg ${Style.adminButton}`}
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Salir
        </button>
      </Link>
    )
  );
}
