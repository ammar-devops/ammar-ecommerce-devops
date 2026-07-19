import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-tag">🚀 AWS DevOps Portfolio Project</span>

        <h1>
          Premium Electronics
          <br />
          Store
        </h1>

        <p>
          React • Express • PostgreSQL • Docker • Jenkins • AWS EC2 • RDS • S3 •
          CloudFront
        </p>

        <div className="hero-buttons">
          <Link to="/products">
            <button className="btn">Shop Now</button>
          </Link>

          <Link to="/cart">
            <button className="btn-outline">View Cart</button>
          </Link>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <h2>15+</h2>
            <p>Products</p>
          </div>

          <div className="stat">
            <h2>100%</h2>
            <p>Dockerized</p>
          </div>

          <div className="stat">
            <h2>AWS</h2>
            <p>Cloud Ready</p>
          </div>

          <div className="stat">
            <h2>CI/CD</h2>
            <p>Jenkins</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
