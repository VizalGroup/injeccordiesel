import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSubcategories,
  GetProducts,
  GetCategories,
  GetSubcategoriesDetail,
  UpdateSubcategory,
  DeleteSubcategory,
  DeleteProduct,
} from "../../../../redux/actions";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ConfigureSubcategories() {
  const dispatch = useDispatch();
  const subcategories = useSelector((state) => state.subcategories);
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);
  const [editedSubcategory, setEditedSubcategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Dejamos este codigo en caso que se pueda llegar a usar la Subcategoria
  // const SubirImagenesClodinari = async (e) => {
  //   const files = e.target.files;
  //   const data = new FormData();
  //   data.append("file", files[0]);
  //   data.append("upload_preset", import.meta.env.VITE_API_UPLOAD_PRESET);

  //   const response = await fetch(import.meta.env.VITE_API_CLOUDINARY_URL, {
  //     method: "POST",
  //     body: data,
  //   });

  //   const file = await response.json();
  //   if (editedSubcategory) {
  //     setEditedSubcategory({ ...editedSubcategory, picture: file.secure_url });
  //   }
  // };

  const handleDelete = async (subcategoryID) => {
    try {
      const products_subCategory = products.filter(
        (product) => product.id_subcategory === subcategoryID
      );
      await Promise.all(
        products_subCategory.map(async (product) => {
          await dispatch(DeleteProduct(product.id));
        })
      );
      await dispatch(DeleteSubcategory(subcategoryID));
      await dispatch(GetSubcategories());
    } catch (error) {
      console.error("Error al eliminar la subcategoría:", error);
    } finally {
      setSubcategoryToDelete(null);
    }
  };

  const confirmDelete = (subcategory) => {
    setSubcategoryToDelete(subcategory);
  };

  // Función para manejar la edición de una categoría
  const handleEdit = (subcategoryID) => {
    const editedSubcategory = subcategories.find(
      (subcategory) => subcategory.id === subcategoryID
    );
    setEditedSubcategory(editedSubcategory);
    dispatch(GetSubcategoriesDetail(subcategoryID)); // Obtener detalles de la categoría para la edición
    // Otra lógica de edición según sea necesario
  };

  const handleSaveEdit = async () => {
    if (editedSubcategory) {
      // Actualizar la categoría utilizando Redux
      await dispatch(
        UpdateSubcategory(editedSubcategory.id, editedSubcategory)
      ); // Actualizar la categoría
      setEditedSubcategory(null); // Limpiar el estado de la categoría editada
      await dispatch(GetSubcategories());
    }
  };

  const getCategoryName = (subcategoryID) => {
    const category = categories.find(
      (category) => category.id === subcategoryID
    );
    return category ? category.title : "N/A";
  };

  useEffect(() => {
    dispatch(GetSubcategories());
    dispatch(GetProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Subcategorías</h2>
      <table className="table">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {subcategories.map((subcategory) => (
            <tr key={subcategory.id}>
              <td>{subcategory.title}</td>
              <td>{getCategoryName(subcategory.id_category)}</td>
              <td>
                <button
                  onClick={() => handleEdit(subcategory.id)}
                  className="btn btn-primary mr-2"
                  style={{ margin: "3px" }}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => confirmDelete(subcategory)}
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
      {subcategoryToDelete !== null && (
        <div className="alert alert-danger" role="alert">
          <p>
            ¿Está seguro que desea eliminar la subcategoría{" "}
            {subcategoryToDelete.title}? Esto Eliminara todos los productos que
            pertenecen a la misma.{" "}
          </p>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete(subcategoryToDelete.id)}
            style={{ margin: "3px" }}
          >
            Borrar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setSubcategoryToDelete(null)}
            style={{ margin: "3px" }}
          >
            Cancelar
          </button>
        </div>
      )}
      {/* Edición de subcategoría */}
      {editedSubcategory && (
        <div className="alert alert-info" role="alert">
          <p>
            Usted está editando la subcategoría: {editedSubcategory.title}.{" "}
          </p>
          <input
            type="text"
            className="form-control"
            value={editedSubcategory.title}
            onChange={(e) =>
              setEditedSubcategory({
                ...editedSubcategory,
                title: e.target.value,
              })
            }
          />
          <br />
          <label >Cambiar de Categoría</label>
          <select
            className="form-control"
            value={editedSubcategory.id_category}
            onChange={(e) => setEditedSubcategory({...editedSubcategory, id_category: e.target.value})
          }
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
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
            onClick={() => setEditedSubcategory(null)}
            style={{ margin: "3px" }}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
