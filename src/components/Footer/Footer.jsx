import React from "react";
import Style from "./Footer.module.css";
import { FaWhatsapp, FaEnvelope, FaCode } from "react-icons/fa";

export default function Footer() {
  const phoneNumber = "3516658905";

  const handleWhatsappClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <footer className={Style.footer}>
      <a className={Style.email} href="mailto:ventas@injeccordiesel.com.ar">
        <FaEnvelope /> ventas@injeccordiesel.com.ar
      </a>
      <span onClick={handleWhatsappClick}>
        <FaWhatsapp className={Style.whatsappIcon} />
      </span>
      © 2024 - injeccordiesel.com.ar
      <span
        onClick={() => window.open("https://vizalgroup.com/", "_blank")}
        className={Style.developmentIcon}
      >
        dev
        <FaCode />
      </span>{" "}
    </footer>
  );
}
