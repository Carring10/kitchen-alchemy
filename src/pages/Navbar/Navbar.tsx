import "./navbar.css";
import MultiLevelDropdown from "../MultiLevelDropdown/MultiLevelDropdown";

export const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="header">
          <p>Cooking is a science, tasting is an art</p>
          <h1>Kitchen Alchemy</h1>
          <input className="search-bar"></input>
        </div>
        <div className="filter-contents">
          {/* Browse categories */}
          {MultiLevelDropdown()}
          {/* Browse meals */}
          <div className="meal-tags">
            <a>Browse by Meal: </a>
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
