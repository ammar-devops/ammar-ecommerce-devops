import { Link, useLocation } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Navbar() {
  const { cart } = useCart();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          🛍️ <span>Ammar Shop</span>
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link className={isActive("/") ? "active" : ""} to="/">
            Home
          </Link>
        </li>

        <li>
          <Link
            className={isActive("/products") ? "active" : ""}
            to="/products"
          >
            Products
          </Link>
        </li>

        <li>
          <Link className={isActive("/orders") ? "active" : ""} to="/orders">
            Orders
          </Link>
        </li>
      </ul>

      <div className="cart-box">
        <Link to="/cart">
          <span>🛒 Cart</span>

          <span className="cart-badge">{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
