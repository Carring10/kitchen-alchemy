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

type TagCategory = "cuisine" | "ingredient" | "season"; // Define valid tag categories

export const RecipeList = () => {
  const { selectedMeal, selectedSubCat } = useContext(MealContext);

  const category = selectedSubCat?.activeCategory?.toLowerCase() as TagCategory; // Explicit type cast
  const subCategory = selectedSubCat?.subCat?.toLowerCase();

  const capitalizedSubCat = subCategory.charAt(0).toUpperCase() + subCategory.slice(1);

  // Filter recipes based on selectedMeal
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filteredRecipes = Object.entries(recipes).filter(([_, recipeData]) => {
    const { tags } = recipeData as Recipe;

    const matchMeal = selectedMeal
      ? tags.meal?.some((meal) => meal.toLowerCase() === selectedMeal.toLowerCase())
      : true;
    // Match category and subcategory
    const matchCategory =
      category && subCategory
        ? Array.isArray(tags[category]) // Ensure the category is an array
          ? (tags[category] as string[]).some((tag) => tag.toLowerCase() === subCategory)
          : (tags[category] as string)?.toLowerCase() === subCategory
        : true;

      console.log(tags[category]);

    return matchMeal && matchCategory;
  });

  return (
    <div>
      {selectedMeal || subCategory ? <h1>{selectedMeal ? selectedMeal : null} {selectedMeal && subCategory ? "+" : null} {subCategory ? capitalizedSubCat : null}</h1> : <h1>All Recipes</h1>}
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
