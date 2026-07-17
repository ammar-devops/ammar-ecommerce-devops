import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../hooks/useCart";

function Cart() {
  const { cart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div>
        <h1>Shopping Cart</h1>

        <h3>Your cart is empty.</h3>

        <Link to="/products">
          <button className="btn">Go Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Shopping Cart</h1>

      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <hr />

      <h2>Total : ₹ {total}</h2>

      <Link to="/checkout">
        <button className="btn">Proceed to Checkout</button>
      </Link>
    </div>
  );
}

export default Cart;
