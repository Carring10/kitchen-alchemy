import { Navbar } from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../index.css";
import "./savedrecipes.css";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recipes") || "[]") as Recipe[];
    setSavedRecipes(stored);
  }, []);

  const deleteRecipeByName = (nameToDelete: string) => {
    const updated = savedRecipes.filter(r => r.name !== nameToDelete);
    setSavedRecipes(updated);
    localStorage.setItem("recipes", JSON.stringify(updated));
  };

  return (
    <>
      <Navbar />
      <div className="saved-recipes-container">
        <div className="saved-recipe-title-container">
          <h1 className="saved-recipe-title">Your Saved Recipes</h1>
          <div className="content-separator"></div>
        </div>
        <div className="saved-recipes-img-container">
          {savedRecipes.map((recipe, index) => (
            <div className="saved-recipe-link-container">
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
              <button className="delete-recipe" onClick={() => deleteRecipeByName(recipe.name)}>delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};