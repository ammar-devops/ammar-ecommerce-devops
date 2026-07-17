import { useCart } from "../hooks/useCart";

function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeItem } = useCart();

  return (
    <div className="cart-item">
      <div>
        <h3>{item.name}</h3>

        <p>₹ {item.price}</p>

        <p>Qty : {item.qty}</p>
      </div>

      <div>
        <button onClick={() => decreaseQty(item.id)}>-</button>

        <button onClick={() => increaseQty(item.id)}>+</button>

        <button onClick={() => removeItem(item.id)}>Remove</button>
      </div>
    </div>
  );
}

export default CartItem;
