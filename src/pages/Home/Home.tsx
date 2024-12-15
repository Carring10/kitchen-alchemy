import { Navbar } from "../Navbar/Navbar";
import { RecipeList } from "../RecipeList/RecipeList";
import "../../index.css";

export const Home = () => {
  return (
    <>
      <Navbar />
      <h1>All Recipes</h1>
      <RecipeList />
    </>
  );
};
