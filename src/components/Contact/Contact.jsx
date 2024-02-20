import React, { useState } from "react";
import Style from "./Contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, phoneNumber, message } = formData;
    const emailContent = `¡Que tal! Mi nombre es ${name}\n\n Mi consulta/mensaje es el/la siguiente: ${message}\n\n Mis datos de contactos son:\n\n Correo electrónico: ${email}\nNúmero de teléfono: ${phoneNumber}\n\n ¡Saludos!`;
    window.location.href = `mailto:ventas@injeccordiesel.com.ar?subject=Consulta&body=${encodeURIComponent(
      emailContent
    )}`;
  };

  return (
    <div className={`${Style.container} container`}>
      <h4 >Contacto</h4>
      <p>
        ¡Puede dejar su consulta aquí! Le responderemos a la brevedad. Una vez
        hagas clic en el botón enviar se abrirá tu aplicación de correo
        electrónico predeterminada y solo debes hacer clic en enviar, Siéntete
        libre de adjuntar una imagen si es necesario para tu consulta.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Número de teléfono:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="form-control"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Mensaje:
          </label>
          <textarea
            id="message"
            name="message"
            className="form-control"
            value={formData.message}
            onChange={handleChange}
            style={{height: "250px"}}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}
