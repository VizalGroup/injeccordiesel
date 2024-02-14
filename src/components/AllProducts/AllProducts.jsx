import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(GetSubcategories());
    dispatch(GetProducts());
    dispatch(GetCategories());
  }, [dispatch]);

  console.log(products);

  return (
    <div>
      <div style={{ marginTop: "80px" }}></div>
      {products.map((product, index) => (
        <div class="card" className={Style.container} key={index}>
          <img src={product.picture} class="card-img-top" alt={product.title} />
          <div class="card-body">
            <h5 class="card-title">{product.title}</h5>
            <p class="card-text">{product.summary}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              {
                categories.find(
                  (category) =>
                    subcategories.find(
                      (subcategory) => subcategory.id === product.id_subcategory
                    )?.id_category === category.id
                )?.title
              }
            </li>
            <li class="list-group-item">
              {
                subcategories.find(
                  (subcategory) => subcategory.id === product.id_subcategory
                )?.title
              }
            </li>
            <li class="list-group-item">{product.code}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
