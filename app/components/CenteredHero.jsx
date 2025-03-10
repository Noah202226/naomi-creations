import React from "react";

function CenteredHero() {
  return (
    <div
      className="hero min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/products/naomiCreationBg.jpg')" }}
    >
      <div
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/your-image.png')" }}
      >
        <div className="absolute inset-0  bg-opacity-50"></div>
        <div className="relative z-10 text-center p-8 max-w-lg bg-white bg-opacity-90 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to Nayomi Creation!
          </h1>
          <p className="text-gray-700 my-4">
            We specialize in high-quality digital products, including
            beautifully designed Canva templates to help you create stunning
            visuals with ease. Whether you need social media graphics, business
            templates, or creative designs, we’ve got you covered. Elevate your
            brand effortlessly with our ready-to-use designs!
          </p>
          <button className="mt-6 btn btn-primary text-white text-lg px-6">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default CenteredHero;
