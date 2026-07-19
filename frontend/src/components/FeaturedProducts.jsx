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

      // Show first 6 products on Home page
      setProducts(data.slice(0, 6));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="featured-section">
      <div className="section-header">
        <div>
          <span className="section-tag">POPULAR PRODUCTS</span>

          <h2>Featured Products</h2>

          <p>Discover our latest premium electronics collection.</p>
        </div>

        <Link to="/products">
          <button className="btn">View All Products →</button>
        </Link>
      </div>

      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
