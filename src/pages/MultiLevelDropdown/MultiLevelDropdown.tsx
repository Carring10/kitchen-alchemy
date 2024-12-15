import { useState } from "react";
import "./multileveldropdown.css";

type Categories = {
  [key: string]: string[];
};

const MultiLevelDropdown = () => {
  const [dropdownMenu, setdropdownMenu] = useState<true | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories: Categories = {
    Cuisine: ["Southern", "Latin", "Asian", "European"],
    Ingredient: ["Beef", "Chicken", "Pork", "Pasta", "Vegetable-Based"],
    Season: ["Summer", "Winter", "Spring", "Autumn"],
  };
  
  const handleDropdownClick = () => {
    setdropdownMenu(dropdownMenu === true ? null : true);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };


  const showCategories = () => {
    return (
      <div className="dropdown-menu">
        {Object.keys(categories).map((category) => (
          <div key={category} className="dropdown-item">
            <button
              type="button"
              className="category-button"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
            {activeCategory === category && (
              <ul className="subcategory-list">
                {categories[category].map((subCategory) => (
                  <li key={subCategory} className="subcategory-item">
                    {subCategory}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dropdown">
      <label htmlFor="categories" onClick={() => handleDropdownClick()}>
        All Recipes
      </label>
      {dropdownMenu && showCategories()}
    </div>
  );
};

export default MultiLevelDropdown;
