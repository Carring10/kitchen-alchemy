import { useEffect, useState } from "react";
import "./multileveldropdown.css";
import { MouseEvent, useContext } from "react";
import { MealContext } from "../../Context/mealContext";

type Categories = {
  [key: string]: string[];
};

const MultiLevelDropdown = () => {
  const { selectedSubCat, setSelectedSubCat } = useContext(MealContext);
  const [dropdownMenu, setdropdownMenu] = useState<true | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | "">("");

  const categories: Categories = {
    Cuisine: ["Southern", "Latin", "Asian", "European"],
    Ingredient: ["Beef", "Chicken", "Pork", "Fish", "Pasta", "Vegetable-Based"],
    Season: ["Summer", "Winter", "Spring", "Autumn"],
  };

  const handleDropdownClick = () => {
    setdropdownMenu(dropdownMenu === true ? null : true);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? "" : category);
  };

  const handleSubCategoryClick = (event: MouseEvent<HTMLLIElement>) => {
    if (event.target instanceof HTMLLIElement) {
      const subCat = event.target.textContent || "";

      setSelectedSubCat({ subCat, activeCategory });
      sessionStorage.setItem(
        "subCategory",
        JSON.stringify({ subCat, activeCategory })
      );
    }
  };

  const showCategories = () => {
    return (
      <div className="dropdown-menu">
        <button className="category-button">View All</button>
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
                  <li
                    key={subCategory}
                    className="subcategory-item"
                    onClick={(event) => handleSubCategoryClick(event)}
                  >
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
