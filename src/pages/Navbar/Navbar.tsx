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
    }
  };

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
            <p className="emphasis">Browse by Meal: </p>
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
