import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  function handleAddToCart() {
    addToCart(product);

    // Redirect to Cart page
    navigate("/cart");
  }

  return (
    <div className="card">
      <div className="product-image">📦</div>

      <h2>{product.name}</h2>

      <h3>₹ {Number(product.price).toLocaleString()}</h3>

      <button className="btn" onClick={handleAddToCart}>
        Add To Cart
      </button>
    </div>
  );
}

export default ProductCard;
