import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { getProducts } from "../services/productService";

function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(() => searchParams.get("search") ?? "");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  }

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search) {
      list = list.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "All") {
      list = list.filter((product) => product.category === category);
    }

    switch (sortBy) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;

      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        break;
    }

    return list;
  }, [products, search, category, sortBy]);

  return (
    <div className="container">
      <div className="page-header">
        <h1>Products</h1>

        <p>Browse our premium electronics collection.</p>
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      <div className="toolbar">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Sort Products</option>

          <option value="price-low">Price : Low → High</option>

          <option value="price-high">Price : High → Low</option>

          <option value="rating">Highest Rated</option>

          <option value="name">A → Z</option>
        </select>
      </div>

      {loading && <Loading />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <div className="results-count">
            {filteredProducts.length} Products Found
          </div>

          <div className="grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
