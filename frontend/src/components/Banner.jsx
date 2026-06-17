const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-content">
        <div className="banner-text">
          <h1>Electrodomésticos para tu hogar</h1>

          <p>
            Calidad, tecnología y el mejor precio para tu día a día
          </p>

          <button>Comprar ahora</button>
        </div>

        <div className="banner-image">
          <img src="/banner.jpg" alt="Electrodomésticos" />
        </div>
      </div>
    </section>
  );
};

export default Banner;