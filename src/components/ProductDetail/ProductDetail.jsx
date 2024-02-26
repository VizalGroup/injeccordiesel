import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetSubcategories,
  GetCategories,
  GetProductDetail,
} from "../../redux/actions";
import { useParams } from "react-router";
import { FaWhatsapp } from "react-icons/fa";
import Style from "./ProductDetail.module.css";

export default function productDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const subcategories = useSelector((state) => state.subcategories);
  const categories = useSelector((state) => state.categories);
  const { productDetail } = useSelector((state) => state);

  const handleWhatsAppClick = (code, title, category, subcategory) => {
    const message = `Buenos días, quería consultar por ${title}, con el código ${code} que figura en su catálogo de Injeccordiesel.com.ar en ${category}, ${subcategory}. \n\n"Aquí escribe tu consulta"`;
    const whatsappUrl = `https://wa.me/3516658905?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const subcategoryName = subcategories.find(
    (subcategory) => subcategory.id === productDetail.id_subcategory
  )?.title;

  const categoryName = categories.find(
    (category) =>
      subcategories.find(
        (subcategory) => subcategory.id === productDetail.id_subcategory
      )?.id_category === category.id
  )?.title;

  useEffect(() => {
    dispatch(GetSubcategories());
    dispatch(GetCategories());
    dispatch(GetProductDetail(id));
  }, [dispatch, id]);

  return (
    <div class="container" style={{ marginTop: "100px" }}>
      <h4>Resultado de su búsqueda:</h4>
      <div className={Style.container}>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={productDetail.picture}
            className="card-img-top"
            alt={productDetail.title}
            style={{ maxHeight: "280px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{productDetail.title}</h5>
            <p className="card-text">{productDetail.summary}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {
                categories.find(
                  (category) =>
                    subcategories.find(
                      (subcategory) =>
                        subcategory.id === productDetail.id_subcategory
                    )?.id_category === category.id
                )?.title
              }
            </li>
            <li className="list-group-item">
              {
                subcategories.find(
                  (subcategory) =>
                    subcategory.id === productDetail.id_subcategory
                )?.title
              }
            </li>
            <li className="list-group-item">
              <b>Código: </b>
              {productDetail.code}
            </li>
          </ul>
          <div className="card-body">
            <button
              className="btn btn-success"
              onClick={() =>
                handleWhatsAppClick(
                  productDetail.code,
                  productDetail.title,
                  categoryName,
                  subcategoryName
                )
              }
            >
              Consultar por <FaWhatsapp />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
