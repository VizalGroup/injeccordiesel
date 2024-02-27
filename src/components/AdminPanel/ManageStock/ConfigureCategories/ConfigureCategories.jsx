import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCategories,
  GetCategoriesDetail,
  GetProducts,
  GetSubcategories,
  UpdateCategory,
  DeleteCategory,
  DeleteProduct,
  DeleteSubcategory,
} from "../../../../redux/actions";
import { FaEdit, FaTrash } from "react-icons/fa";
import Style from "./ConfigureCategories.module.css";

export default function ConfigureCategories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const subcategories = useSelector((state) => state.subcategories);
  const products = useSelector((state) => state.products);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editedCategory, setEditedCategory] = useState(null);

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
    if (editedCategory) {
      setEditedCategory({ ...editedCategory, picture: file.secure_url });
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const subcategories_category = subcategories.filter(
        (subcategory) => subcategory.id_category === categoryId
      );
      await Promise.all(
        subcategories_category.map(async (subcategory) => {
          const products_subCategory = products.filter(
            (product) => product.id_subcategory === subcategory.id
          );
          await Promise.all(
            products_subCategory.map(async (product) => {
              await dispatch(DeleteProduct(product.id));
            })
          );
          await dispatch(DeleteSubcategory(subcategory.id));
        })
      );
      await dispatch(DeleteCategory(categoryId));
      await dispatch(GetCategories());
      closeModal();
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    } finally {
      setCategoryToDelete(null);
    }
  };

  const confirmDelete = (category) => {
    setCategoryToDelete(category);
  };

  // Función para manejar la edición de una categoría
  const handleEdit = (categoryId) => {
    const editedCategory = categories.find(
      (category) => category.id === categoryId
    );
    setEditedCategory(editedCategory);
    dispatch(GetCategoriesDetail(categoryId)); // Obtener detalles de la categoría para la edición
    // Otra lógica de edición según sea necesario
  };

  const handleSaveEdit = async () => {
    if (editedCategory) {
      // Actualizar la categoría utilizando Redux
      await dispatch(UpdateCategory(editedCategory.id, editedCategory)); // Actualizar la categoría
      setEditedCategory(null); // Limpiar el estado de la categoría editada
      await dispatch(GetCategories());
    }
  };

  useEffect(() => {
    dispatch(GetCategories());
    dispatch(GetSubcategories());
    dispatch(GetProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Categorías</h2>
      <table className="table">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.title}</td>
              <td>
                <img
                  src={category.picture}
                  alt={category.title}
                  style={{ width: "150px", height: "auto" }}
                />
              </td>
              <td>
                <button
                  onClick={() => handleEdit(category.id)}
                  className="btn btn-primary mr-2"
                  style={{ margin: "3px" }}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => confirmDelete(category)}
                  className="btn btn-danger"
                  style={{ margin: "3px" }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Confirmación de eliminación */}
      {categoryToDelete !== null && (
        <div className="alert alert-danger" role="alert">
          <p>
            ¿Está seguro que desea eliminar la categoría{" "}
            {categoryToDelete.title}? Esto Eliminara todas las subcategorías y
            productos que pertenecen a la misma.{" "}
          </p>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete(categoryToDelete.id)}
            style={{ margin: "3px" }}
          >
            Borrar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setCategoryToDelete(null)}
            style={{ margin: "3px" }}
          >
            Cancelar
          </button>
        </div>
      )}
      {/* Edición de categoría */}
      {editedCategory && (
        <div className="alert alert-info" role="alert">
          <p>Usted está editando la categoría: {editedCategory.title}. </p>
          <input
            type="text"
            className="form-control"
            value={editedCategory.title}
            onChange={(e) =>
              setEditedCategory({ ...editedCategory, title: e.target.value })
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
          <div>
              {editedCategory.picture ? (
                <div>
                  <img className={Style.imageRender} src={editedCategory.picture} />
                </div>
              ) : null}
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
            onClick={() => setEditedCategory(null)}
            style={{ margin: "3px" }}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
