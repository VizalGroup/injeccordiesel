import React from "react";
import Style from "./MainLanding.module.css";

export default function MainLanding() {
  return (
    <div className={Style.container}>
      <h3 className={Style.title}>Bienvenidos a Injeccordiesel</h3>
      <br />
      <p className={Style.parr}>
        Tu aliado confiable en inyectores diesel y sus componentes para
        automóviles. Nos especializamos en ofrecer piezas de alta calidad para
        inyección diesel <b>Denso</b>. Como empresa comprometida con la
        excelencia, nos esforzamos por proporcionar una amplia gama de productos
        que incluyen inyectores, reguladores de presión y caudal, sensores de
        presión, fichas eléctricas para inyectores y válvulas de sobrepresión.
        En Injeccordiesel, nos mantenemos actualizados con las últimas
        tendencias y desarrollos en la industria automotriz para asegurarnos de
        que nuestros clientes obtengan soluciones innovadoras y eficientes para
        sus necesidades de inyección diesel. Nos enorgullece ofrecer un servicio
        personalizado. Todo lo que necesitas hacer es proporcionarnos fotos y
        números de pieza para su identificación. Con un stock permanente y la
        capacidad de realizar envíos en el día a cualquier parte del país, en
        Injeccordiesel nos comprometemos a brindar una experiencia de compra
        conveniente y satisfactoria para nuestros clientes. ¡No dudes en
        hacernos llegar tus consultas! Estamos aquí para ayudarte. Contáctanos
        hoy mismo en{" "}
        <a href="mailto:ventas@injeccordiesel.com.ar">
          ventas@injeccordiesel.com.ar
        </a>{" "}
        y te responderemos a la brevedad posible.
      </p>
    </div>
  );
}
