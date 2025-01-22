import { Navbar } from "../Navbar/Navbar";
import "../../index.css";
import "./recipe.css";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const Recipe = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({ contentRef });

  const location = useLocation();
  const recipeData = location.state;
  const recipeName = recipeData[1];
  const recipeDescription = recipeData[0].description;
  const cookTime = recipeData[0].time.cookTime;
  const prepTime = recipeData[0].time.prepTime;
  const recipeYield = recipeData[0].yield;

  console.log(recipeData);
  return (
    <>
      <Navbar />
      <div className="recipe-body" ref={contentRef}>
        <div className="recipe-container">
          <div className="recipe-title-description">
            <h2>{recipeName}</h2>
            <div className="recipe-recipe-info">
              <p>
                <span>Prep Time:</span> {prepTime}
              </p>
              <p>
                <span>Cook Time:</span> {cookTime}
              </p>
              <p>
                <span>Yield:</span> {recipeYield}
              </p>
              <div>
                <button className="print-button" onClick={() => reactToPrintFn()}>Print</button>
                <button>Save</button>
              </div>
            </div>
            <p className="recipe-description">{recipeDescription}</p>
          </div>
          <h3 className="recipe-recipe-ingredients">Ingredients:</h3>
          <div className="ingredients-list-container">
            {recipeData[0].ingredients.map((ingredient: string[], index: number) => (
              <div className="ingredient-contents-container">
                <label>
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    key={index}
                    value={ingredient}
                  ></input>
                  {ingredient}
                </label>
              </div>
            ))}
          </div>
          <h3 className="recipe-recipe-instructions">Instructions:</h3>
          <ol className="instructions-ordered-list">
            {recipeData[0].instructions.map((instruction: string[], index: number) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};
