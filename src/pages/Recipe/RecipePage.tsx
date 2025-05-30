import { Navbar } from "../Navbar/Navbar";
import "../../index.css";
import "./recipepage.css";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import type { Recipe } from "../RecipeList/RecipeList";

export const RecipePage = () => {
  const [isSaved, setIsSaved] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({ contentRef });

  const location = useLocation();
  const recipeData = location.state;

  const recipe = {
    name: recipeData[1],
    description: recipeData[0].description,
    img: recipeData[0].img,
    ingredients: recipeData[0].ingredients,
    instructions: recipeData[0].instructions,
    tags: recipeData[0].tags,
    time: {
      cook: recipeData[0].time.cookTime,
      prep: recipeData[0].time.prepTime,
    },
    yield: recipeData[0].yield,
  };

  const existing = JSON.parse(localStorage.getItem("recipes") || "[]") as Recipe[];

  useEffect(() => {
    const found = existing.some(r => r.name === recipe.name);

    setIsSaved(found);
  }, [recipe.name]);

  const toggleSaveRecipe = () => {
    const alreadyExists = existing.some(r => r.name === recipe.name);

    let updated;

    if (alreadyExists) {
      // Remove the recipe
      updated = existing.filter(r => r.name !== recipe.name);
      setIsSaved(false);
    } else {
      // Add the recipe
      updated = [...existing, recipe];
      setIsSaved(true);
    }

    localStorage.setItem("recipes", JSON.stringify(updated));
  };

  return (
    <>
      <Navbar />
      <div className="recipe-body" ref={contentRef}>
        <div className="recipe-img-container">
          <img className="recipe-img" src={`/images/${recipe.img}`} />
        </div>
        <div className="recipe-container">
          <div className="recipe-title-description">
            <h2>{recipe.name}</h2>
            <div className="recipe-recipe-info">
              <div className="recipe-times">
                <p>
                  <span>Prep Time:</span> {recipe.time.prep}
                </p>
                <p>
                  <span>Cook Time:</span> {recipe.time.cook}
                </p>
                <p>
                  <span>Yield:</span> {recipe.yield}
                </p>
              </div>
              <div className="recipe-button-container">
                <button className="print-button" onClick={() => reactToPrintFn()}>
                  Print
                </button>
                <button onClick={toggleSaveRecipe}>{isSaved ? "Unsave" : "Save"}</button>
              </div>
            </div>
            <p className="recipe-description">{recipe.description}</p>
          </div>
          <div className="ingredients-list-container">
            <h3 className="recipe-recipe-ingredients">Ingredients:</h3>
            {Array.isArray(recipe.ingredients)
              ? recipe.ingredients.map((ingredient: string, index: number) => (
                <div className="ingredient-contents-container" key={index}>
                  <label>
                    <input
                      id={`ingredient-checkbox-${index}`}
                      type="checkbox"
                      value={ingredient}
                    />
                    {ingredient}
                  </label>
                </div>
              ))
              : Object.entries(recipe.ingredients).map(
                ([category, items], categoryIndex) => (
                  <div key={categoryIndex} className="ingredient-category">
                    <h3>{category}</h3>
                    {(items as string[]).map((ingredient: string, index: number) => (
                      <div className="ingredient-contents-container" key={index}>
                        <label>
                          <input
                            id={`ingredient-checkbox-${categoryIndex}-${index}`}
                            type="checkbox"
                            value={ingredient}
                          />
                          {ingredient}
                        </label>
                      </div>
                    ))}
                  </div>
                )
              )}
          </div>
          <div className="recipe-instructions-container">
            <h3 className="recipe-recipe-instructions">Instructions:</h3>
            {Array.isArray(recipe.instructions)
              ? recipe.instructions.map((step: string, index: number) => (
                <div className="instruction-contents-container" key={index}>
                  <div className="instruction-contents">
                    <div className="number-index">{index + 1} </div> <p>{step}</p>
                  </div>
                </div>
              ))
              : Object.entries(recipe.instructions).map(
                ([category, steps], categoryIndex: number) => (
                  <div key={categoryIndex} className="instruction-category">
                    <h3>{category}</h3>
                    {(steps as string[]).map((step: string, index: number) => (
                      <div className="instruction-contents-container" key={index}>
                        <p>
                          <strong>{index + 1} </strong> {step}
                        </p>
                      </div>
                    ))}
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </>
  );
};
