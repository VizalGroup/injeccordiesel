import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProducts } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function MainSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProducts());
  }, [dispatch]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              list="productOptions"
            />
            <datalist id="productOptions">
              {filteredProducts.map(product => (
                <option key={product.id} value={product.title && product.code} />
                

              ))}
            </datalist>
            <div className="input-group-append">
              <Link
                to={filteredProducts.length > 0 ? `/producto/${filteredProducts[0].id}` : "#"}
                className="btn btn-outline-secondary"
                role="button"
              >
                Ir
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
