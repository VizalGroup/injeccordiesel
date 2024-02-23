import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostSubcategory, GetCategories } from "../../../redux/actions";
import { Form, Button, Alert } from "react-bootstrap";

export default function NewSubcategory() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    id_category: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const categories = useSelector((state) => state.categories);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(PostSubcategory(formData));
      setShowSuccess(true);
    } catch (error) {
      console.error("Error al crear la subcategoria:", error);
      setShowError(true);
    }
  };

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
    setFormData({ ...formData, [e.target.id]: file.secure_url });
  };

  useEffect(() => {
    dispatch(GetCategories());
  }, [dispatch]);

  return (
    <div>
      <h2>Nueva Subcategoria</h2>
      {showSuccess && (
        <Alert variant="success">Subcategoría creada con éxito.</Alert>
      )}
      {showError && (
        <Alert variant="danger">
          Error al crear subcategoría. Por favor, inténtalo de nuevo.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Nombre de la subcategoría</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="picture">
          <Form.Label>Imagen</Form.Label>
          <br />
          <Form.Text className="text-muted">
            Recuerda subir una imagen PNG para que el aspecto de la página de
            cada categoría se muestre correctamente. Convierte tu Imagen{" "}
            <a
              href="https://www.remove.bg/es"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aquí
            </a>
            . TODAVÍA PENDIENTE DE USAR O NO.
          </Form.Text>
          <Form.Control
            type="file"
            name="file"
            onChange={(e) => SubirImagenesClodinari(e)}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="id_category">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            as="select"
            name="id_category"
            value={formData.id_category}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar Categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <br />
        <Button variant="success" type="submit">
          Crear Subcategoría
        </Button>
      </Form>
    </div>
  );
}
