import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetSubcategories,
  GetProducts,
  GetCategories,
} from "../../redux/actions";
import Style from "./AllProducts.module.css";


export default function AllProducts() {
  const subcategories = useSelector((state) => state.subcategories);
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(GetSubcategories());
    dispatch(GetProducts());
    dispatch(GetCategories());
  }, [dispatch]);

  console.log(subcategories);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para filtrar productos por término de búsqueda
  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h3 className={Style.title}>Todos los Productos</h3>
      <p className={Style.parr}>
        Bienvenido a nuestro catálogo en línea. Injeccordiesel tiene a su
        disposición una amplia variedad de productos para satisfacer tus
        necesidades. No dudes en consultarnos vía{" "}
        <a href="https://wa.me/3516658905" target="_blank">
          WhatsApp
        </a>{" "}
        o por correo electrónico a{" "}
        <a href="mailto:ventas@injeccordiesel.com.ar">
          ventas@injeccordiesel.com.ar
        </a>
        . Para una búsqueda más sencilla puede buscar por categoría en la barra
        de navegación lateral.
      </p>

      {/* Campo de búsqueda */}
      <div className={Style.divSearch}>
        <input
          type="text"
          className={Style.inputSearch}
          placeholder=" 🔎 Buscar productos... "
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">
            Buscar
          </button>
        </div> */}

      {/* Contenedor de las Cartas */}
      <div className={Style.container}>
        {filteredProducts.reverse().map((product, index) => (
          <div
            className="card"
            style={{ width: "18rem", marginBottom: "1vh" }}
            key={index}
          >
            <img
              src={product.picture}
              className="card-img-top"
              alt={product.title}
              style={{ maxHeight: "280px" }}
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.summary}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                {
                  categories.find(
                    (category) =>
                      subcategories.find(
                        (subcategory) =>
                          subcategory.id === product.id_subcategory
                      )?.id_category === category.id
                  )?.title
                }
              </li>
              <li className="list-group-item">
                {
                  subcategories.find(
                    (subcategory) => subcategory.id === product.id_subcategory
                  )?.title
                }
              </li>
              <li className="list-group-item">
                <b>Código: </b>
                {product.code}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
