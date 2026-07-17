import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";
import { getProducts } from "../services/productService";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data.slice(0, 3));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="featured-section">
      <h2>🔥 Featured Products</h2>

      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Link to="/products">
        <button className="btn">View All Products</button>
      </Link>
    </section>
  );
}

export default FeaturedProducts;
