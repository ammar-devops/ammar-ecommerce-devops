import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <h1>🛒 Ammar Shop</h1>

      <h2>Modern E-Commerce Demo</h2>

      <p>React • Express • PostgreSQL • Docker • AWS</p>

      <div className="hero-buttons">
        <Link to="/products">
          <button className="btn">Shop Now</button>
        </Link>

        <Link to="/cart">
          <button className="btn-outline">View Cart</button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
