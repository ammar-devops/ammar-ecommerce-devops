import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../hooks/useCart";

function Cart() {
  const { cart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h1>🛒 Shopping Cart</h1>

        <p>Your cart is empty.</p>

        <Link to="/products">
          <button className="btn">Continue Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>🛒 Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="summary-row">
            <span>Total</span>
            <strong>₹ {Number(total).toLocaleString()}</strong>
          </div>

          <Link to="/checkout">
            <button className="checkout-btn">Proceed to Checkout →</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
