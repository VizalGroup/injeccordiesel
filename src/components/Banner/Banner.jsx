import React from "react";
import Style from "./Banner.module.css";
import { FaWhatsapp } from "react-icons/fa";

export default function Banner() {
  return (
    <div className={Style.banner}>
      <p className={Style.parr}>
        Si usted trabaja con bombas diesel, taller de reparación o tienda de
        repuestos, solicite recibir cotizaciones con precios a través de
        WhatsApp.
      </p>
      <a href="https://wa.me/3516658905" className={Style.whatsapp}>
        
        <FaWhatsapp /> 3516658905
      </a>
      <p className={Style.parr}>
        <b>¡Contactanos!</b>
      </p>
    </div>
  );
}
