import "./navbar.css";
import MultiLevelDropdown from "../MultiLevelDropdown/MultiLevelDropdown";
import { MouseEvent, KeyboardEvent, useContext, useState } from "react";
import { MealContext } from "../../Context/mealContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { selectedMeal, setSelectedMeal } = useContext(MealContext);
  const [search, setSearch] = useState("");
  const { setSearchTerm } = useContext(MealContext);

  const navigate = useNavigate();

  const handleInputChange = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      const searchTerm = event.target.value;

      setSearch(searchTerm);
      setSearchTerm(searchTerm); // Context

      sessionStorage.setItem("search", searchTerm);
    }
  };
  
  const handleMealClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.target instanceof HTMLAnchorElement) {
      event.preventDefault();
      const mealName = event.target.textContent || "";

      setSelectedMeal(mealName); // Update MealContext
      sessionStorage.setItem("meal", mealName);

      if (selectedMeal === mealName) {
        sessionStorage.setItem("meal", "");
        setSelectedMeal("");
      }

      if (window.location.pathname !== "/") {
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="header">
          <p>
            cooking is a <span className="underline">science</span>, tasting is an{" "}
            <span className="underline">art</span>
          </p>
          <h1 className="app-header">Kitchen Alchemy</h1>
          <div className="input-container">
          <button className="search-icon-button">
          <i className="bx bx-search"></i>
          </button>
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={handleInputChange}
          ></input>
          </div>
        </div>
        <div className="filter-contents">
          {/* Browse categories */}
          {MultiLevelDropdown()}
          {/* Browse meals */}
          <div className="meal-tags">
            <p className="emphasis" id="browse-meal">
              browse by meal : 
            </p>
            {["breakfast", "salad", "soup", "lunch", "dinner"].map((meal) => (
              <Link
                key={meal}
                to={"/" + meal}
                onClick={handleMealClick}
                className={selectedMeal === meal ? "selected" : ""}
              >
                {meal}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
