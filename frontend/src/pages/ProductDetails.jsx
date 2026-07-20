import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { getProductById } from "../services/productService";
import { useCart } from "../hooks/useCart";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="details-loading">
        <h2>Loading Product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="details-loading">
        <h2>Product Not Found</h2>
      </div>
    );
  }

  const image =
    product.image_url && product.image_url.trim() !== ""
      ? product.image_url
      : "https://placehold.co/600x450?text=Product";

  function handleAddToCart() {
    addToCart(product);
    navigate("/cart");
  }

  return (
    <div className="product-details">
      <div className="details-image">
        <img src={image} alt={product.name} />
      </div>

      <div className="details-info">
        <span className="product-category">{product.category}</span>

        <h1>{product.name}</h1>

        <h3>{product.brand}</h3>

        <div className="rating">⭐ {product.rating}</div>

        <h2 className="price">₹ {Number(product.price).toLocaleString()}</h2>

        <p className="details-description">{product.description}</p>

        <p className="stock">
          {product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
        </p>

        <div className="details-buttons">
          <button
            className="btn add-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            🛒 Add To Cart
          </button>

          <Link to="/products">
            <button className="btn-outline">← Back to Products</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
