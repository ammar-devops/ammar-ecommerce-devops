import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { getProducts } from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();

      setProducts(data);

      setLoading(false);
    } catch (err) {
      setError("Unable to load products.");

      setLoading(false);
    }
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <h1>Products</h1>

      <SearchBar search={search} setSearch={setSearch} />

      {loading && <Loading />}

      {error && <ErrorMessage message={error} />}

      <div className="grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default Products;
