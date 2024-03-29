import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetSubcategories,
  GetProducts,
  GetCategoriesDetail,
} from "../../redux/actions";
import { useParams } from "react-router";
import Style from "./PageByCategory.module.css";
import { FaWhatsapp } from "react-icons/fa";

export default function PageByCategory() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const subcategories = useSelector((state) => state.subcategories);
  const products = useSelector((state) => state.products);
  const { categoryDetail } = useSelector((state) => state);

  useEffect(() => {
    dispatch(GetSubcategories());
    dispatch(GetProducts());
    dispatch(GetCategoriesDetail(id));
  }, [dispatch, id]);

  const imagenFondo = categoryDetail && categoryDetail.picture;
  const backgroundImageStyle = {
    backgroundImage: `url(${imagenFondo})`,
    backgroundRepeat: "repeat",
    backgroundSize: "200px auto",
    opacity: 0.08,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  };

  const handleWhatsAppClick = (code, title, category, subcategory) => {
    const message = `Buenos días, quería consultar por ${title}, con el código ${code} que figura en su catálogo de Injeccordiesel.com.ar en ${category}, ${subcategory}. \n\n"Aquí escribe tu consulta"`;
    const whatsappUrl = `https://wa.me/3516658905?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className={Style.container}>
      <div style={backgroundImageStyle}></div>
      {categoryDetail && products && subcategories ? (
        <div>
          <h2 className={Style.categoryTitle}>{categoryDetail.title}</h2>
          <hr />
          {subcategories
            .filter(
              (subcategory) => subcategory.id_category === categoryDetail.id
            )
            .map((subcategory) => (
              <div key={subcategory.id}>
                <h4 className={Style.subcategoryTitle}>{subcategory.title}</h4>
                <div className={Style.cards}>
                  {products
                    .filter(
                      (product) => product.id_subcategory === subcategory.id
                    )
                    .map((filteredProduct) => (
                      <div
                        className="card"
                        style={{ width: "18rem", marginBottom: "1vh" }}
                        key={filteredProduct.id}
                      >
                        <img
                          src={filteredProduct.picture}
                          className="card-img-top"
                          alt={filteredProduct.title}
                          style={{ maxHeight: "280px" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            {filteredProduct.title}
                          </h5>
                          <p className="card-text">{filteredProduct.summary}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <b>Código: </b>
                            {filteredProduct.code}
                          </li>
                        </ul>
                        <div className="card-body">
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              handleWhatsAppClick(
                                filteredProduct.code,
                                filteredProduct.title,
                                categoryDetail.title,
                                subcategories.find(
                                  (subcategory) =>
                                    subcategory.id ===
                                    filteredProduct.id_subcategory
                                )?.title
                              )
                            }
                          >
                            Consultar por <FaWhatsapp />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
}
