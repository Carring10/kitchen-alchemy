import { Navbar } from "../Navbar/Navbar";
import "../../index.css";
import "./recipe.css";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { MouseEvent } from "react";

export const Recipe = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({ contentRef });

  const location = useLocation();
  const recipeData = location.state;

  const recipe = {
    name: recipeData[1],
    description: recipeData[0].description,
    img: recipeData[0].img,
    cookTime: recipeData[0].time.cookTime,
    prepTime: recipeData[0].time.prepTime,
    yield: recipeData[0].yield,
  };

  const saveRecipe = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.target instanceof HTMLButtonElement) {
      localStorage.setItem("recipeObject", JSON.stringify(recipe));
    }
  }

  console.log(recipeData);
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
                  <span>Prep Time:</span> {recipe.prepTime}
                </p>
                <p>
                  <span>Cook Time:</span> {recipe.cookTime}
                </p>
                <p>
                  <span>Yield:</span> {recipe.yield}
                </p>
              </div>
              <div className="recipe-button-container">
                <button className="print-button" onClick={() => reactToPrintFn()}>
                  Print
                </button>
                <button onClick={(event) => saveRecipe(event)}>Save</button>
              </div>
            </div>
            <p className="recipe-description">{recipe.description}</p>
          </div>
          <div className="ingredients-list-container">
            <h3 className="recipe-recipe-ingredients">Ingredients:</h3>
            {Array.isArray(recipeData[0].ingredients)
              ? recipeData[0].ingredients.map((ingredient: string, index: number) => (
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
              : Object.entries(recipeData[0].ingredients).map(
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
            {Array.isArray(recipeData[0].instructions)
              ? recipeData[0].instructions.map((step: string, index: number) => (
                <div className="instruction-contents-container" key={index}>
                  <div className="instruction-contents">
                    <div className="number-index">{index + 1} </div> <p>{step}</p>
                  </div>
                </div>
              ))
              : Object.entries(recipeData[0].instructions).map(
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
