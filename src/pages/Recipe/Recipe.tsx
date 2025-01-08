import { Navbar } from "../Navbar/Navbar";
import "../../index.css";
import { useLocation } from "react-router-dom";

export const Recipe = () => {
  const location = useLocation();
  const recipeData = location.state;
  console.log(recipeData);
  return (
    <>
      <Navbar />
      <div className="recipe-container">
        <h2>{recipeData[1]}</h2>
        <p>{recipeData[0].description}</p>
        <h3>Ingredients:</h3>
        <ul>
          {recipeData[0].ingredients.map((ingredient: string[], index: number) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <ol>
          {recipeData[0].instructions.map((instruction: string[], index: number) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </>
  );
};
