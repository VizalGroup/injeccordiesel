import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaList, FaCog } from "react-icons/fa"; // Importa los iconos de FontAwesome
import Style from "./AdminPanel.module.css";
import Logout from "../Logout/Logout";

export default function AdminPanel() {
  return (
    <div class='container'>
      <h1 className={Style.title}>Panel Administrador <a href="/">injeccordiesel.com.ar</a></h1>
      <br />
      <p className={Style.parr}>
        Por razones de seguridad pulsar el botón salir, si no quedará la sesión
        abierta en su navegador
      </p>
      <br />
      <div className={Style.adminPanel}>
        <div className={Style.adminButtonContainer}>
          <Link to="/dashboard/new_product">
            <button className={`btn btn-primary btn-lg ${Style.adminButton}`}>
              <FaPlus className={Style.icon} /> 
              <span> Nuevo Producto</span>
            </button>
          </Link>
        </div>
        <div className={Style.adminButtonContainer}>
          <Link to="/dashboard/new_category_or_subcategory">
            <button className={`btn btn-success btn-lg ${Style.adminButton}`}>
              <FaList className={Style.icon} />
              <span> Nueva Categoría/Subcategoría</span>
            </button>
          </Link>
        </div>
        <div className={Style.adminButtonContainer}>
          <Link to="/dashboard/manage_stock">
            <button className={`btn btn-warning btn-lg ${Style.adminButton}`}>
              <FaCog className={Style.icon} />
              <span> Administrar Existentes</span>
            </button>
          </Link>
        </div>
        <div className={Style.adminButtonContainer}>
          <Logout />
        </div>
      </div>
    </div>
  );
}
