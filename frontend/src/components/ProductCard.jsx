import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  function handleAddToCart() {
    addToCart(product);
    navigate("/cart");
  }

  const image =
    product.image_url && product.image_url.trim() !== ""
      ? product.image_url
      : "https://placehold.co/300x220?text=Product";

  return (
    <div className="card">
      <Link to={`/products/${product.id}`}>
        <img src={image} alt={product.name} className="product-image" />
      </Link>

      <div className="product-category">{product.category}</div>

      <h2>
        <Link to={`/products/${product.id}`} className="product-link">
          {product.name}
        </Link>
      </h2>

      <p className="brand">{product.brand}</p>

      <div className="rating">⭐ {product.rating}</div>

      <h3 className="price">₹ {Number(product.price).toLocaleString()}</h3>

      <p className="stock">
        {product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
      </p>

      <button className="btn" onClick={handleAddToCart}>
        🛒 Add To Cart
      </button>
    </div>
  );
}

export default ProductCard;
