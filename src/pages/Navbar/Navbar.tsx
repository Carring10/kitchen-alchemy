import "./navbar.css";

export const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <h1>Kitchen Alchemy</h1>
        <p>Cooking is a science, tasting is an art</p>
        <input className="search-bar"></input>
        <div className="filter-container">
          {/* Browse categories */}
          <label htmlFor="categories">All Recipes</label>
          <select name="categories">
            <option>Cuisine</option>
            <option>Ingredient</option>
            <option>Season</option>
          </select>
          {/* Browse meals */}
          <div className="meal-tags">
            <a>Breakfast</a>
            <a>Salad</a>
            <a>Soup</a>
            <a>Lunch</a>
            <a>Dinner</a>
          </div>
        </div>
      </div>
    </>
  );
};
