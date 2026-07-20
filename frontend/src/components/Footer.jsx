function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h3>🛍️ DevOps Shop</h3>
          <p>
            Modern Ecommerce Demo built with React, Express, PostgreSQL &
            Docker.
          </p>
        </div>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
          <a href="/orders">Orders</a>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 DevOps Shop • Built for DevOps Practice Ammar
      </div>
    </footer>
  );
}

export default Footer;
