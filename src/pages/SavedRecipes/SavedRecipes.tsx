import { Navbar } from "../Navbar/Navbar";
import "../../index.css";
import { Link } from "react-router-dom";


const savedRecipes = JSON.parse(localStorage.getItem("recipes") || "[]") as Recipe[];
console.log(savedRecipes.map((recipe, index) => (
  console.log("map:", recipe)
)))

export const SavedRecipes = () => {
  return (
    <>
      <Navbar />
      <div>
        {savedRecipes.map((recipe, index) => (
          <div key={index}>
            <Link
              to="/recipe"
              state={[recipe, recipe.name]}
              key={recipe.name}
              className="recipe-link"
            >
              <img
                src={`/images/${recipe.img}`}
                alt={recipe.name}
                className="recipe-list-img"
              />
            </Link>
          </div>
        ))}
      </div>

    </>
  );
};