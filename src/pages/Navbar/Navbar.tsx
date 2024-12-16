import "./navbar.css";
import MultiLevelDropdown from "../MultiLevelDropdown/MultiLevelDropdown";
import { useState, useEffect, MouseEvent } from "react";

export const Navbar = () => {
  const [meal, setMeal] = useState("");

  const handleMealClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.target instanceof HTMLAnchorElement) {
      const target = event.target as HTMLAnchorElement;
      setMeal(target.textContent || "");
    }
  };

  useEffect(() => {
    console.log(meal);
  }, [meal]);

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
