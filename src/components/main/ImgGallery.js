import { useEffect, useState } from "react";
import Img from "./ImgGallery.module.css";

const ImgGallery = ({ src }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (src.length === 0) return; // Prevent interval if no images

    const lastIndex = src.length - 1;

    const nextImage = () => {
      setIndex((prevIndex) => (prevIndex === lastIndex ? 0 : prevIndex + 1));
    };

    const id = setInterval(nextImage, 6000); // Change image every 6 seconds

    return () => clearInterval(id); // Clean up on unmount
  }, [src]); // Correct dependency to `src` array

  if (src.length === 0) {
    return <p>No images available.</p>;
  }

  return (
    <div className={Img.carouselContainer}>
      <div className={Img.carouselSlider}>
        <img
          className={Img.img}
          key={src[index]}
          src={`http://localhost:4000/${src[index]}`}
          alt={`findhome ${index + 1}`}
        />
      </div>

      {/* Image Indicators */}
      <div className={Img.indicators}>
        {src.map((_, idx) => (
          <span
            key={idx}
            className={`${Img.indicator} ${
              idx === index ? Img.active : ""
            }`}></span>
        ))}
      </div>
    </div>
  );
};

export default ImgGallery;
