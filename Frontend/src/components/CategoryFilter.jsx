export default function CategoryFilter({ setCategory, activeCategory }) {
  const categories = ["ALL", "Food & Drinks", "Groceries", "Travel", "Health", "Shopping", "Other"];
  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button key={cat} className={`cat-btn ${activeCategory === cat ? "active" : ""}`} onClick={() => setCategory(cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
}
