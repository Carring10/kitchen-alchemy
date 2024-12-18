import { useContext } from "react";
import recipes from "../../utils/recipes.json";
import { MealContext } from "../../Context/mealContext";

interface Recipe {
  ingredients: string[];
  instructions: string[];
  tags: {
    meal: string[];
    cuisine: string[];
    ingredient: string;
    season: string[];
  };
}

export const RecipeList = () => {
  const { selectedMeal } = useContext(MealContext);
  console.log(selectedMeal);
  return (
    <div>
      {Object.entries(recipes).map(([recipeName, recipeData]) => {
        const { ingredients, instructions, tags } = recipeData as Recipe;

        return (
          <div key={recipeName} style={{ marginBottom: "20px" }}>
            <h2>{recipeName}</h2>
            <h3>Ingredients:</h3>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Instructions:</h3>
            <ol>
              {instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
};
