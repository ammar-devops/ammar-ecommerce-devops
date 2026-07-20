function SearchBar({ search, setSearch }) {
  return (
    <div className="search-box">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>

        <input
          type="text"
          placeholder="Search products, brands, categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            className="clear-search"
            onClick={() => setSearch("")}
            type="button"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
