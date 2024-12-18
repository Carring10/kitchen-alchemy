import "./navbar.css";
import MultiLevelDropdown from "../MultiLevelDropdown/MultiLevelDropdown";
import { MouseEvent, useContext } from "react";
import { MealContext } from "../../Context/mealContext";

export const Navbar = () => {
  const { setSelectedMeal } = useContext(MealContext);

  const handleMealClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.target instanceof HTMLAnchorElement) {
      const mealName = event.target.textContent || "";
      setSelectedMeal(mealName); // Update MealContext
      sessionStorage.setItem("meal", mealName);
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
            <a>Browse by Meal: </a>
            <a onClick={(event) => handleMealClick(event)}>Breakfast</a>
            <a onClick={(event) => handleMealClick(event)}>Salad</a>
            <a onClick={(event) => handleMealClick(event)}>Soup</a>
            <a onClick={(event) => handleMealClick(event)}>Lunch</a>
            <a onClick={(event) => handleMealClick(event)}>Dinner</a>
          </div>
        </div>
      </div>
    </>
  );
};
