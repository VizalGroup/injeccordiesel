import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetCategories } from "../../redux/actions";
import { Carousel } from "react-bootstrap";
import Style from "./Slider.module.css";
import fondo1 from "../../assets/Fondo1.jpg";
import fondo2 from "../../assets/fondo2.jpg";
import fondo3 from "../../assets/fondo3.jpg";



export default function Slider() {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgrounds = [fondo1, fondo2, fondo3]; // Aquí agregas más imágenes según lo necesites

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 4000);

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);

  useEffect(() => {
    dispatch(GetCategories());
  }, [dispatch]);
 
  return (
    <div>
      <Carousel
        interval={2000}
        indicators={false}
        controls={false}
        
      >
        {categories.map((category) => (
          <Carousel.Item
            key={category.id}
            className={`${Style.background} ${Style.fadeTransition}`}
            style={{
              backgroundImage: `url(${backgrounds[currentImageIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <div className={Style.whiteCircle}>
              <img
                className={Style.fixSize}
                src={category.picture}
                alt={category.title}
              />
            </div>
            <h1 className={Style.titleSlide}>{category.title}</h1>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
