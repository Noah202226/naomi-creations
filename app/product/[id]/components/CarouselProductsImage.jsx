import React from "react";

const CarouselProductsImage = ({ images }) => {
  // Ensure images is always an array
  const imageArray = Array.isArray(images) ? images : images ? [images] : [];

  return (
    <div>
      <div className="carousel w-full">
        {imageArray.map((image, index) => (
          <div
            key={index}
            id={`item${index + 1}`}
            className="carousel-item w-full"
          >
            <img src={image} className="w-full " alt={`Product ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {imageArray.map((_, index) => (
          <a key={index} href={`#item${index + 1}`} className="btn btn-xs">
            {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CarouselProductsImage;
