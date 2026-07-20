import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.2 4.2" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 4.5h2l1.9 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.5L20.5 8H7" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.9-8.4a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.8 20c.9-3.3 3.4-5 7.2-5s6.3 1.7 7.2 5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

function Navbar() {
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [hasScrolled, setHasScrolled] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const updateScrolledState = () => setHasScrolled(window.scrollY > 8);

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCategoryOpen(false);
  }, [location.pathname, location.search]);

  function handleSearch(event) {
    event.preventDefault();

    const query = search.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
  }

  return (
    <nav className={`navbar ${hasScrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-inner">
        <div className="logo">
          <Link to="/" aria-label="Ammar Shop home">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
            </span>
            <span>
              Ammar<span className="brand-accent">.</span>
            </span>
          </Link>
        </div>

        <form className="navbar-search" onSubmit={handleSearch} role="search">
          <SearchIcon />
          <input
            aria-label="Search products"
            type="search"
            placeholder="Search products, brands and more"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <ul className="nav-links">
          <li>
            <Link className={isActive("/products") ? "active" : ""} to="/products">
              Products
            </Link>
          </li>

          <li className="category-nav-item">
            <button
              className={`category-trigger ${isCategoryOpen ? "is-open" : ""}`}
              type="button"
              aria-expanded={isCategoryOpen}
              onClick={() => setIsCategoryOpen((open) => !open)}
            >
              Categories
              <ChevronIcon />
            </button>

            {isCategoryOpen && (
              <div className="category-menu">
                <span className="category-menu-label">Shop by department</span>
                {["Phones & wearables", "Computers & tablets", "Audio & home tech"].map(
                  (category) => (
                    <Link key={category} to="/products">
                      {category}
                    </Link>
                  ),
                )}
                <Link className="category-menu-all" to="/products">
                  Explore all products
                </Link>
              </div>
            )}
          </li>

          <li>
            <Link className={isActive("/orders") ? "active" : ""} to="/orders">
              Orders
            </Link>
          </li>
        </ul>

        <div className="navbar-actions">
          <button className="icon-button" type="button" aria-label="Wishlist" title="Wishlist">
            <HeartIcon />
          </button>

          <button className="icon-button" type="button" aria-label="Profile" title="Profile">
            <UserIcon />
          </button>

          <div className="cart-box">
            <Link to="/cart" aria-label={`Cart, ${totalItems} items`}>
              <CartIcon />
              <span className="cart-label">Cart</span>
              <span className="cart-badge">{totalItems}</span>
            </Link>
          </div>

          <button
            className={`menu-toggle ${isMenuOpen ? "is-open" : ""}`}
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-navigation">
          <Link className={isActive("/") ? "active" : ""} to="/">
            Home
          </Link>
          <Link className={isActive("/products") ? "active" : ""} to="/products">
            Products
          </Link>
          <Link to="/products">Categories</Link>
          <Link className={isActive("/orders") ? "active" : ""} to="/orders">
            Orders
          </Link>
          <Link to="/cart">Cart ({totalItems})</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
