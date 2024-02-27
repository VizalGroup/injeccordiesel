import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSubcategories,
  GetProducts,
  GetProductDetail,
  UpdateProduct,
  DeleteProduct,
} from "../../../../redux/actions";
import { FaEdit, FaTrash } from "react-icons/fa";
import Style from "./ConfigureProducts.module.css";

export default function ConfigureProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);
  const subcategories = useSelector((state) => state.subcategories);
  const [page, setPage] = useState(1);
  const productsPerPage = 10; // Number of products to display per page

  useEffect(() => {
    dispatch(GetSubcategories());
    dispatch(GetProducts());
  }, [dispatch]);

  const SubirImagenesClodinari = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", import.meta.env.VITE_API_UPLOAD_PRESET);

    const response = await fetch(import.meta.env.VITE_API_CLOUDINARY_URL, {
      method: "POST",
      body: data,
    });

    const file = await response.json();
    if (editedProduct) {
      setEditedProduct({ ...editedProduct, picture: file.secure_url });
    }
  };

  const handleDelete = async (ProductId) => {
    try {
      await dispatch(DeleteProduct(ProductId));
      await dispatch(GetProducts());
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    } finally {
      setProductToDelete(null);
    }
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
  };

  const handleEdit = (ProductId) => {
    const editedProduct = products.find((product) => product.id === ProductId);
    setEditedProduct(editedProduct);
    dispatch(GetProductDetail(ProductId));
  };

  const handleSaveEdit = async () => {
    if (editedProduct) {
      await dispatch(UpdateProduct(editedProduct.id, editedProduct));
      setEditedProduct(null);
      await dispatch(GetProducts());
    }
  };

  const getSubcategoryName = (ProductId) => {
    const subcategory = subcategories.find(
      (subcategory) => subcategory.id === ProductId
    );
    return subcategory ? subcategory.title : "N/A";
  };

  // Calculate pagination
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  // Generate pagination buttons
  const pageCount = Math.ceil(products.length / productsPerPage);
  const pagination = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div>
      <h2>Productos</h2>

      {/* Confirmación de eliminación */}
      {productToDelete && (
        <div className="alert alert-danger" role="alert">
          <p>
            ¿Está seguro que desea eliminar el producto{" "}
            <b>{productToDelete.title}</b>?
          </p>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete(productToDelete.id)}
            style={{ margin: "3px" }}
          >
            Borrar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setProductToDelete(null)}
            style={{ margin: "3px" }}
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Edición de producto */}
      {editedProduct && (
        <div className="alert alert-info" role="alert">
          <p>
            Usted está editando el producto: <b>{editedProduct.title}</b>.{" "}
          </p>
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            value={editedProduct.title}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, title: e.target.value })
            }
          />
          <br />
          <label>Codigo</label>
          <input
            type="text"
            className="form-control"
            value={editedProduct.code}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, code: e.target.value })
            }
          />
          <br />
          <label>Resumen</label>
          <textarea
            type="text"
            className="form-control"
            value={editedProduct.summary}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, summary: e.target.value })
            }
          />
          <div className="mb-3">
            <br />
            <input
              type="file"
              className="form-control"
              id="fileInput"
              onChange={SubirImagenesClodinari}
            />
          </div>
          <div>
              {editedProduct.picture ? (
                <div>
                  <img className={Style.imageRender} src={editedProduct.picture} />
                </div>
              ) : null}
            </div>
        <br />
          <br />
          <label >Cambiar de Subcategoría</label>
          <select
            className="form-control"
            value={editedProduct.id_subcategory}
            onChange={(e) => setEditedProduct({...editedProduct, id_subcategory: e.target.value})
          }
          >
            <option value="">Seleccionar subcategoría</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.title}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary"
            onClick={handleSaveEdit}
            style={{ margin: "3px" }}
          >
            Guardar
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setEditedProduct(null)}
            style={{ margin: "3px" }}
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Paginación */}
      <div className="d-flex justify-content-center">
        {pagination.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn ${page === pageNumber ? "btn-dark" : "btn-outline-dark"} ml-1`}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {/* Tabla de productos */}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Resumen</th>
            <th>Código</th>
            <th>Subcategoría</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {displayedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.summary}</td>
              <td>{product.code}</td>
              <td>{getSubcategoryName(product.id_subcategory)}</td>
              <td>
                <img
                  src={product.picture}
                  alt={product.title}
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleEdit(product.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => confirmDelete(product)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
