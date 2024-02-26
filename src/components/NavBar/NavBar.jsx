import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/logo.png";
import { GetCategories } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function NavBar() {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCategories());
  }, [dispatch]);

  return (
    <div>
      <nav class="navbar bg-body-tertiary fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img
              src={logo}
              alt="logo"
              width="100"
              class="d-inline-block align-text-top"
            />{" "}
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                Menú de navegación
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/">
                    <b>Inicio</b>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/contacto">
                    <b>Contacto</b>
                  </a>
                </li>

                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <b>Catálogo</b>
                  </a>
                  <ul class="dropdown-menu">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          class="dropdown-item"
                          to={`/categoria/${category.id}`}
                        >
                          <b>{category.title}</b>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item" href="/productos">
                        <b>Mostrar Todos</b>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              {/* <form class="d-flex mt-3" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Buscar"
                  aria-label="Search"
                />
                <button class="btn btn-outline-dark" type="submit">
                  Buscar
                </button>
              </form> */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
