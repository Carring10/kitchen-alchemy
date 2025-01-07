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
      <h3>Ingredients:</h3>
      <ul>
        {recipeData.ingredients.map((ingredient: string[], index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <ol>
        {recipeData.instructions.map((instruction: string[], index: number) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </>
  );
};
