import { useCart } from "../hooks/useCart";

function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeItem } = useCart();

  const image =
    item.image_url && item.image_url.trim() !== ""
      ? item.image_url
      : "https://placehold.co/120x120?text=Product";

  return (
    <div className="cart-item">
      <img src={image} alt={item.name} className="cart-image" />

      <div className="cart-info">
        <h3>{item.name}</h3>

        <p>{item.brand}</p>

        <h2>₹ {Number(item.price).toLocaleString()}</h2>

        <p>Quantity : {item.qty}</p>

        <div className="cart-buttons">
          <button onClick={() => decreaseQty(item.id)}>-</button>

          <button onClick={() => increaseQty(item.id)}>+</button>

          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
