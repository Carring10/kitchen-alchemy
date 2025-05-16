import "./navbar.css";
import MultiLevelDropdown from "../MultiLevelDropdown/MultiLevelDropdown";
import {
  MouseEvent,
  useContext,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { MealContext } from "../../Context/mealContext";
import { Link, useNavigate } from "react-router-dom";
import { SavedRecipes } from "../SavedRecipes/SavedRecipes";

export const Navbar = () => {
  const { selectedMeal, setSelectedMeal } = useContext(MealContext);
  const { setSelectedSubCat } = useContext(MealContext);
  const [search, setSearch] = useState("");
  const { setSearchTerm } = useContext(MealContext);
  const [matches, setMatches] = useState(window.matchMedia("(max-width: 648px)").matches);

  useEffect(() => {
    window
      .matchMedia("(max-width: 648px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const compactNavbar = () => {
    if (matches) {
      return (
        <div className="header-container">
          <h1 className="app-header" onClick={(event) => handleHomeNavigation(event)}>Kitchen Alchemy</h1>
          <p>
            cooking is a <span className="underline">science</span>, tasting is an{" "}
            <span className="underline">art</span>
          </p>
        </div>
      );
    } else {
      return (
        <>
          <p>
            cooking is a <span className="underline">science</span>, tasting is an{" "}
            <span className="underline">art</span>
          </p>
          <h1 className="app-header" onClick={(event) => handleHomeNavigation(event)}>Kitchen Alchemy</h1>
        </>
      );
    }
  };

  const navigate = useNavigate();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.currentTarget.value;

    setSearch(searchTerm);
    setSearchTerm(searchTerm); // Context

    sessionStorage.setItem("search", searchTerm);
  }

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

  const handleHomeNavigation = (event: MouseEvent<HTMLHeadingElement>) => {
    if (event.target instanceof HTMLHeadingElement) {
      setSelectedSubCat({ subCat: "", activeCategory: "" });
      sessionStorage.removeItem("subCategory");

      sessionStorage.setItem("meal", "");
      setSelectedMeal("");
    }

    if (window.location.pathname != "/") {
      navigate("/");
    }

  };

  return (
    <>
      <div className="navbar">
        <div className="header">
          {compactNavbar()}
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
          <div>
            <Link to="/saved-recipes">Saved Recipes</Link>
          </div>
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
