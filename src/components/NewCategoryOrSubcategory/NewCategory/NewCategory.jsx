import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PostCategory, GetCategories } from "../../../redux/actions";
import { Form, Button, Alert } from "react-bootstrap";
import Style from "./NewCategory.module.css";

export default function NewCategory() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    picture: null,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(PostCategory(formData));
      setShowSuccess(true);
    } catch (error) {
      console.error("Error al crear la categoría:", error);
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
      <h2>Nueva Categoría</h2>
      {showSuccess && (
        <Alert variant="success">Categoría publicada con éxito.</Alert>
      )}
      {showError && (
        <Alert variant="danger">
          Error al publicar el Categoría. Por favor, inténtalo de nuevo.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Nombre de la Categoría</Form.Label>
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
            cada categoría se muestre correctamente. Convierte tu Imagen {" "}
            <a
              href="https://www.remove.bg/es"
              target="_blank"
              rel="noopener noreferrer"
            >
               Aquí
            </a>
            
          </Form.Text>
          <Form.Control
            type="file"
            name="file"
            onChange={(e) => SubirImagenesClodinari(e)}
            required
          />
        </Form.Group>
        <div>
              {formData.picture ? (
                <div>
                  <img className={Style.imageRender} src={formData.picture} />
                </div>
              ) : null}
            </div>
        <br />
        <br />
        <Button variant="success" type="submit">
          Crear Categoría
        </Button>
      </Form>
    </div>
  );
}
