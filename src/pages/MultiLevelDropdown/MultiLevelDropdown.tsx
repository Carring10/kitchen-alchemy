import { useState } from "react";
import "./multileveldropdown.css";
import { MouseEvent, useContext } from "react";
import { MealContext } from "../../Context/mealContext";

type Categories = {
  [key: string]: string[];
};

const MultiLevelDropdown = () => {
  const { setSelectedSubCat } = useContext(MealContext);
  const [dropdownMenu, setdropdownMenu] = useState<true | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | "">("");

  const categories: Categories = {
    Cuisine: ["Southern", "Latin", "Asian", "European"],
    Ingredient: ["Beef", "Chicken", "Pork", "Fish", "Pasta", "Vegetable-Based"],
    Season: ["Summer", "Winter", "Spring", "Autumn"],
  };

  const handleDropdownMouseOver = () => {
    setdropdownMenu(dropdownMenu === true ? null : true);
  };

  const handleViewAllClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.target instanceof HTMLButtonElement) {
      setSelectedSubCat({ subCat: "", activeCategory: "" });
      sessionStorage.removeItem("subCategory");
    }
  };

  const handleCategoryMouseOver = (category: string) => {
    setActiveCategory(category);
  };

  const handleCatLeave = () => {
    setActiveCategory("");
  };

  const handleMenuLeave = () => {
    setdropdownMenu(null);
  };

  const handleSubCategoryClick = (event: MouseEvent<HTMLLIElement>) => {
    if (event.target instanceof HTMLLIElement) {
      const subCat = event.target.textContent || "";

      setSelectedSubCat({ subCat, activeCategory });
      sessionStorage.setItem("subCategory", JSON.stringify({ subCat, activeCategory }));

      handleCatLeave();
      handleMenuLeave();
    }
  };

  const showCategories = () => {
    return (
      <div className="dropdown-menu" onMouseLeave={handleMenuLeave}>
        <button
          className="category-button"
          onClick={(event) => handleViewAllClick(event)}
          onMouseOver={handleCatLeave}
        >
          View All
        </button>
        {Object.keys(categories).map((category) => (
          <div key={category} className="dropdown-item">
            <button
              type="button"
              className="category-button"
              onMouseOver={() => handleCategoryMouseOver(category)}
            >
              {category}
              <i className="bx bxs-right-arrow" id="right-arrow"></i>
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
      <label htmlFor="categories" onMouseOver={() => handleDropdownMouseOver()}>
        All Recipes
      </label>
      {dropdownMenu && showCategories()}
    </div>
  );
};

export default MultiLevelDropdown;
