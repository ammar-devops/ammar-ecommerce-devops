import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orb hero-orb-left" aria-hidden="true" />
      <div className="hero-orb hero-orb-right" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-content">
          <span className="hero-tag">CURATED ELECTRONICS, DELIVERED</span>

          <h1>
            Technology that
            <span> feels exceptional.</span>
          </h1>

          <p>
            Discover thoughtfully selected devices for work, play and every
            brilliant moment in between.
          </p>

          <div className="hero-buttons">
            <Link className="hero-cta hero-cta-primary" to="/products">
              Shop the collection
              <span aria-hidden="true">→</span>
            </Link>

            <Link className="hero-cta hero-cta-secondary" to="/cart">
              View your cart
            </Link>
          </div>

          <div className="hero-trust" aria-label="Shopping benefits">
            <span>Free express delivery</span>
            <span>2-year care included</span>
            <span>Secure checkout</span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="visual-halo" />
          <div className="hero-laptop">
            <div className="laptop-screen">
              <div className="screen-topbar">
                <span />
                <span />
                <span />
              </div>
              <div className="screen-layout">
                <span className="screen-panel screen-panel-primary" />
                <span className="screen-panel screen-panel-secondary" />
                <span className="screen-panel screen-panel-tertiary" />
              </div>
            </div>
            <div className="laptop-base" />
          </div>

          <div className="hero-phone">
            <div className="phone-speaker" />
            <div className="phone-screen">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="hero-glass-card hero-glass-card-top">
            <span className="glass-card-icon">✦</span>
            <div>
              <strong>Made to move</strong>
              <small>Design-led tech</small>
            </div>
          </div>

          <div className="hero-glass-card hero-glass-card-bottom">
            <span className="glass-card-rating">4.9</span>
            <div>
              <strong>Customer favourite</strong>
              <small>Rated by shoppers</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
