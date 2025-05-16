import { useContext, useState } from "react";
import recipes from "../../utils/recipes.json";
import { MealContext } from "../../Context/mealContext";
import "./recipeList.css";
import { Link } from "react-router-dom";

interface Recipe {
  img: string;
  description: string;
  time: {
    prepTime: string;
    cookTime: string;
  };
  yield: string;
  ingredients: string[];
  instructions: string[];
  tags: {
    meal: string[];
    cuisine: string[];
    ingredient: string;
    season: string[];
  };
}

type TagCategory = "cuisine" | "ingredient" | "season";

export const RecipeList = () => {
  const { selectedMeal, selectedSubCat, searchTerm } = useContext(MealContext);

  const [hoverContent, setHoverContent] = useState<null | {
    recipeName: string;
    prepTime: string;
    cookTime: string;
    yield: string;
  }>(null);

  const handleImgMouseOver = (
    recipeName: string,
    recipeData: {
      time: { prepTime: string; cookTime: string };
      yield: string;
    }
  ) => {
    setHoverContent({
      recipeName,
      prepTime: recipeData.time.prepTime,
      cookTime: recipeData.time.cookTime,
      yield: recipeData.yield,
    });
  };

  const handleMouseOut = () => {
    setHoverContent(null);
  };

  const category = selectedSubCat?.activeCategory?.toLowerCase() as TagCategory;
  const subCategory = selectedSubCat?.subCat?.toLowerCase();

  // Filter recipes based on selectedMeal
  const filteredRecipes = Object.entries(recipes).filter(([_, recipeData]) => {
    const { tags } = recipeData as Recipe;

    const matchMeal = selectedMeal
      ? tags.meal?.some((meal) => meal.toLowerCase() === selectedMeal.toLowerCase())
      : true;
    // Match category and subcategory
    const matchCategory =
      category && subCategory
        ? Array.isArray(tags[category])
          ? (tags[category] as string[]).some((tag) => tag.toLowerCase() === subCategory)
          : (tags[category] as string)?.toLowerCase() === subCategory
        : true;

    const matchSearchFilter = searchTerm ?  _.toLowerCase().includes(searchTerm.toLowerCase()) : true;

    return matchMeal && matchCategory && matchSearchFilter;
  });

  return (
    <>
      <div className="recipe-list-title-container">
        {selectedMeal || subCategory ? (
          <h1 className="recipe-list-title">
            {selectedMeal ? selectedMeal : null}{" "}
            {selectedMeal && subCategory ? "+" : null}{" "}
            {subCategory ? subCategory : null}
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
            <div className="recipe-list-container">
              <Link
                to="/recipe"
                state={[recipeData, recipeName]}
                key={recipeName}
                className="recipe-link"
              >
                <div key={recipeName} style={{ marginBottom: "20px" }}>
                  <div className="recipe-list-img-container">
                    <h2 className="recipe-name">{recipeName}</h2>
                    <img
                      src={`/images/${img}`}
                      alt={recipeName}
                      className="recipe-list-img"
                      onMouseOver={() => handleImgMouseOver(recipeName, recipeData)}
                      onMouseOut={handleMouseOut}
                    />
                    {hoverContent && hoverContent.recipeName === recipeName && (
                      <div className="cooking-info-container" key={recipeName}>
                        <p className="prep-time">
                          <i className="bx bx-fork"></i> Prep Time:{" "}
                          {hoverContent.prepTime}
                        </p>
                        <p className="cook-time">
                          <i className="bx bxs-time"></i> Cook Time:{" "}
                          {hoverContent.cookTime}
                        </p>
                        <p className="yield">
                          <i className="bx bxs-dish"></i> Yields: {hoverContent.yield}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <p>No recipes found for the selected meal: {selectedMeal}</p>
      )}
    </>
  );
};
