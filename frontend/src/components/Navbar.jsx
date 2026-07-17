import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Navbar() {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="navbar">
      <h2>
        <Link to="/">🛒 Ammar Shop</Link>
      </h2>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/cart">Cart ({totalItems})</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
