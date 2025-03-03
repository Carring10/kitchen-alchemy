import { useEffect, useState } from "react";
import "./multileveldropdown.css";
import { MouseEvent, useContext } from "react";
import { MealContext } from "../../Context/mealContext";
import { useNavigate } from "react-router-dom";

type Categories = {
  [key: string]: string[];
};

const MultiLevelDropdown = () => {
  const { setSelectedSubCat, setSelectedMeal } = useContext(MealContext);
  const [dropdownMenu, setdropdownMenu] = useState<true | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | "">("");
  const [matches, setMatches] = useState(window.matchMedia("(max-width: 648px)").matches);

  useEffect(() => {
    window
      .matchMedia("(max-width: 648px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const compactMenu = () => {
    if (matches) {
      return (
        <label
          htmlFor="categories"
          onMouseOver={() => handleDropdownMouseOver()}
          id="all-recipes"
        >
          <i className="bx bx-menu" id="dropdown-right-arrow"></i>
        </label>
      );
    } else {
      return (
        <label
          htmlFor="categories"
          onMouseOver={() => handleDropdownMouseOver()}
          id="all-recipes"
          className={dropdownMenu ? "selected" : ""}
        >
          <i className="bx bxs-right-arrow" id="dropdown-right-arrow"></i>
          all recipes
        </label>
      );
    }
  };

  const navigate = useNavigate();

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

    if (window.location.pathname != "/") {
      navigate("/");
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

      if (window.location.pathname != "/") {
        navigate("/");
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
      {compactMenu()}
      {dropdownMenu && showCategories()}
    </div>
  );
};

export default MultiLevelDropdown;
