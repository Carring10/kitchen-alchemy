import "./navbar.css";
import MultiLevelDropdown from "../MultiLevelDropdown/MultiLevelDropdown";
import { MouseEvent, useContext } from "react";
import { MealContext } from "../../Context/mealContext";

export const Navbar = () => {
  const { selectedMeal, setSelectedMeal } = useContext(MealContext);

  const handleMealClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.target instanceof HTMLAnchorElement) {
      const mealName = event.target.textContent || "";

      setSelectedMeal(mealName); // Update MealContext
      sessionStorage.setItem("meal", mealName);

      if (selectedMeal === mealName) {
        sessionStorage.setItem("meal", "");
        setSelectedMeal("");
      }

      if (window.location.href != "/") {
        window.location.href = "/";
      }
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="header">
          <p>cooking is a <span className="underline">science</span>, tasting is an <span className="underline">art</span></p>
          <h1 className="app-header">Kitchen Alchemy</h1>
          <input className="search-bar"></input>
        </div>
        <div className="filter-contents">
          {/* Browse categories */}
          {MultiLevelDropdown()}
          {/* Browse meals */}
          <div className="meal-tags">
            <p className="emphasis" id="browse-meal">Browse by Meal</p>
            {["breakfast", "salad", "soup", "lunch", "dinner"].map((meal) => (
              <a
                key={meal}
                href="#"
                onClick={handleMealClick}
                className={selectedMeal === meal ? "selected" : ""}
              >
                {meal}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
