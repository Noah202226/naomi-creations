import React from "react";

function CenteredHero() {
  return (
    <div
      className="hero min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/products/naomiCreationBg.jpg')" }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center shadow-2xl">
        <div className="max-w-md text-black">
          <h1 className="text-5xl font-bold">Hello</h1>
          <p className="py-6 text-white font-medium">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default CenteredHero;
