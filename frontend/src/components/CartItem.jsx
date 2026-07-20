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

        <p className="brand">{item.brand}</p>

        <h2 className="price">₹ {Number(item.price).toLocaleString()}</h2>

        <div className="cart-buttons">
          <button className="qty-btn" onClick={() => decreaseQty(item.id)}>
            −
          </button>

          <span className="qty-value">{item.qty}</span>

          <button className="qty-btn" onClick={() => increaseQty(item.id)}>
            +
          </button>

          <button className="remove-btn" onClick={() => removeItem(item.id)}>
            🗑 Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
