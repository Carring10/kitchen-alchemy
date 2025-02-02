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
                <button className="print-button" onClick={() => reactToPrintFn()}>
                  Print
                </button>
                <button>Save</button>
              </div>
            </div>
            <p className="recipe-description">{recipeDescription}</p>
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
            <ol className="instructions-ordered-list">
              {Array.isArray(recipeData[0].instructions)
                ? recipeData[0].instructions.map((step: string, index: number) => (
                    <div className="instruction-contents-container" key={index}>
                      <p>
                        <strong>Step {index + 1}: </strong> {step}
                      </p>
                    </div>
                  ))
                : Object.entries(recipeData[0].instructions).map(
                    ([category, steps], categoryIndex: number) => (
                      <div key={categoryIndex} className="instruction-category">
                        <h3>{category}</h3>
                        {(steps as string[]).map((step: string, index: number) => (
                          <div className="instruction-contents-container" key={index}>
                            <p>
                              <strong>Step {index + 1}: </strong> {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    )
                  )}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};
