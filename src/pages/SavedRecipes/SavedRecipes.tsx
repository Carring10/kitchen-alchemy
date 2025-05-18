import { Navbar } from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "../../index.css";
import "./savedrecipes.css";


const savedRecipes = JSON.parse(localStorage.getItem("recipes") || "[]") as Recipe[];

export const SavedRecipes = () => {
  return (
    <>
      <Navbar />
      <div className="saved-recipes-container">
        <h2>Your Saved Recipes</h2>
        <div className="saved-recipes-img-container">
          {savedRecipes.map((recipe, index) => (
            <Link
              to="/recipe"
              state={[recipe, recipe.name]}
              key={recipe.name}
              className="saved-recipe-link"
            >
              <div key={index} className="saved-recipe-container">
                <h2 className="saved-recipe-name">{recipe.name}</h2>
                <img
                  src={`/images/${recipe.img}`}
                  alt={recipe.name}
                  className="saved-recipe-list-img"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};