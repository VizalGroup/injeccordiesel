import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetProducts,
  GetProductDetail,
  UpdateProduct,
  DeleteProduct,
} from "../../../../redux/actions";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ConfigureProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);

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
    const editedProduct = products.find((product) => (product.id === ProductId));
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

  useEffect(() => {
    dispatch(GetProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Productos</h2>

      {/* Confirmación de eliminación */}
      {productToDelete !== null && (
        <div className="alert alert-danger" role="alert">
          <p>
            ¿Está seguro que desea eliminar el producto{" "}
            <b> {productToDelete.title}</b>?
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
          <br />
          <button
            className="btn btn-primary"
            onClick={handleSaveEdit}
            style={{ margin: "3px" }}
          >
            Guardar
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => seteditedProduct(null)}
            style={{ margin: "3px" }}
          >
            Cancelar
          </button>
        </div>
      )}

      <table className="table">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Nombre</th>
            <th>Resumen</th>
            <th>Código</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {products
            .map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td style={{ maxWidth: "40vw" }}>{product.summary}</td>
                <td>
                  <b>#{product.code}</b>
                </td>
                <td>
                  <img
                    src={product.picture}
                    alt={product.title}
                    style={{ width: "150px", maxHeight: "150px" }}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="btn btn-primary mr-2"
                    style={{ margin: "3px" }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => confirmDelete(product)}
                    className="btn btn-danger"
                    style={{ margin: "3px" }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
            .reverse()}
        </tbody>
      </table>
    </div>
  );
}
