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
  const { selectedMeal, selectedSubCat } = useContext(MealContext);

  // Filter recipes based on selectedMeal
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filteredRecipes = Object.entries(recipes).filter(([_, recipeData]) => {
    const { tags } = recipeData as Recipe;
    console.log(tags);

    const matchMeal = selectedMeal
      ? tags.meal?.some((meal) => meal.toLowerCase() === selectedMeal.toLowerCase())
      : true;

    return matchMeal;
  });

  return (
    <div>
      {selectedMeal ? <h1>{selectedMeal}</h1> : <h1>All Recipes</h1>}
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map(([recipeName, recipeData]) => {
          const { ingredients, instructions } = recipeData as Recipe;

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
        })
      ) : (
        <p>No recipes found for the selected meal: {selectedMeal}</p>
      )}
    </div>
  );
};
