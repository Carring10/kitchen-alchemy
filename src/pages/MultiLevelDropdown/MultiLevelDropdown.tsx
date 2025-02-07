import { useState } from "react";
import "./multileveldropdown.css";
import { MouseEvent, useContext } from "react";
import { MealContext } from "../../Context/mealContext";

type Categories = {
  [key: string]: string[];
};

const MultiLevelDropdown = () => {
  const { setSelectedSubCat, setSelectedMeal } = useContext(MealContext);
  const [dropdownMenu, setdropdownMenu] = useState<true | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | "">("");

  const categories: Categories = {
    Cuisine: ["Southern", "Latin", "Asian", "European"],
    Ingredient: ["Beef", "Chicken", "Pork", "Fish", "Pasta", "Vegetable-Based"],
    Season: ["Summer", "Winter", "Spring", "Autumn"],
  };

  const handleDropdownMouseOver = () => {
    setdropdownMenu(true);
  };

  const handleViewAllClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.target instanceof HTMLButtonElement) {
      setSelectedSubCat({ subCat: "", activeCategory: "" });
      sessionStorage.removeItem("subCategory");

      sessionStorage.setItem("meal", "");
      setSelectedMeal("");
    }

    if (window.location.href != "/") {
      window.location.href = "/";
    }

    handleMenuLeave();
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

      if (window.location.href != "/") {
        window.location.href = "/";
      }

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
    <div className="dropdown" onMouseLeave={handleMenuLeave}>
      <label
        htmlFor="categories"
        onMouseOver={() => handleDropdownMouseOver()}
        id="all-recipes"
        className={dropdownMenu ? "selected" : ""}
      >
        <i className='bx bxs-right-arrow' id="dropdown-right-arrow"></i>
       all recipes
      </label>
      {dropdownMenu && showCategories()}
    </div>
  );
};

export default MultiLevelDropdown;
