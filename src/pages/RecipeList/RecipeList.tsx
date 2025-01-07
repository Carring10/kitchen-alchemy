import { useContext } from "react";
import recipes from "../../utils/recipes.json";
import { MealContext } from "../../Context/mealContext";
import "./recipeList.css";
import { Link } from "react-router-dom";

interface Recipe {
  img: string;
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
        
    return matchMeal && matchCategory;
  });

  return (
    <div>
      <div className="recipe-list-title-container">
        {selectedMeal || subCategory ? (
          <h1 className="recipe-list-title">
            {selectedMeal ? selectedMeal : null}{" "}
            {selectedMeal && subCategory ? "+" : null}{" "}
            {subCategory ? capitalizedSubCat : null}
          </h1>
        ) : (
          <h1 className="recipe-list-title">All Recipes</h1>
        )}
        <div className="content-separator"></div>
      </div>
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map(([recipeName, recipeData]) => {
          const { img } = recipeData as Recipe;

          return (
            <Link to="/recipe" state={recipeData} key={recipeName} className="recipe-link">
              <div key={recipeName} style={{ marginBottom: "20px" }}>
                <h2 className="recipe-name">{recipeName}</h2>
                <img src={`/images/${img}`} alt={recipeName} />
                {/* <h3>Ingredients:</h3>
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
                </ol> */}
              </div>
            </Link>
          );
        })
      ) : (
        <p>No recipes found for the selected meal: {selectedMeal}</p>
      )}
    </div>
  );
};
